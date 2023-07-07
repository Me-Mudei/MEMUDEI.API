import { APIGatewayEvent, Context } from 'aws-lambda';
import Busboy from 'busboy';
import { FileFacadeFactory } from './infra';
import { UploadFileInput } from './app';
import { BadRequestError } from '#shared/domain';

type ResultFile = {
  file?: Buffer;
  filename?: string;
  encoding?: string;
  mimetype?: string;
};

type ResultBody = {
  files?: ResultFile[];
  type?: UploadFileInput['reference_type'];
};

const fileFacadeFactory = FileFacadeFactory.create();

const getContentType = (event: any) => {
  const contentType = event.headers['content-type'];
  if (!contentType) {
    return event.headers['Content-Type'];
  }
  return contentType;
};

export const parser = (event: any) =>
  new Promise((resolve, reject) => {
    const busboy = Busboy({
      headers: { 'content-type': getContentType(event) },
    });

    const result: ResultBody = {
      files: [],
    };

    busboy.on('file', (_, file, fileData) => {
      file.on('data', (data) => {
        file.on('end', () => {
          result.files.push({
            file: data,
            filename: fileData.filename,
            encoding: fileData.encoding,
            mimetype: fileData.mimeType,
          });
        });
      });
    });

    busboy.on('field', (name, value) => {
      result[name] = value;
    });

    busboy.on('error', (error: any) => reject(error));
    busboy.on('finish', () => {
      event.body = result;
      resolve(event);
    });

    busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
    busboy.end();
  });

const validateFile = (body: { [key: string]: any }): ResultBody => {
  if (!body.files || body.files?.length === 0) {
    throw new BadRequestError('Files not found');
  }
  if (!body.type) {
    throw new BadRequestError('Type not found');
  }
  body.files.forEach((file: any) => {
    if (!file.filename) {
      throw new BadRequestError('Filename not found');
    }
    if (!file.file) {
      throw new BadRequestError(`File not found - ${file.filename}`);
    }
    if (!file.mimetype) {
      throw new BadRequestError(`Mimetype not found - ${file.filename}`);
    }
  });
  return body as ResultBody;
};

export const handler = async (event: APIGatewayEvent, _ctx: Context) => {
  try {
    await parser(event);
    const body = validateFile(event.body as any);
    const output = await fileFacadeFactory.uploadFile({
      reference_type: body.type,
      files: body.files.map((file) => ({
        filename: file.filename,
        mimetype: file.mimetype,
        createReadStream: () => file.file,
      })),
    });
    return {
      statusCode: 200,
      body: JSON.stringify(output),
      contentType: 'application/json',
    };
  } catch (error) {
    const statusCode =
      error.name === 'BadRequestError' ? 400 : error.statusCode ?? 500;
    const errorBody = {
      errors: [
        {
          type: error.name || 'InternalServerError',
          message: error.message,
        },
      ],
    };
    return {
      statusCode,
      body: JSON.stringify(errorBody),
      contentType: 'application/json',
    };
  }
};

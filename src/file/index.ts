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

    const result: ResultFile = {};

    busboy.on('file', (_, file, fileData) => {
      file.on('data', (data) => {
        result.file = data;
      });

      file.on('end', () => {
        result.filename = fileData.filename;
        result.encoding = fileData.encoding;
        result.mimetype = fileData.mimeType;
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

const validateFile = (body: { [key: string]: any }): ResultFile => {
  if (!body.file) {
    throw new BadRequestError('File not found');
  }
  if (!body.filename) {
    throw new BadRequestError('Filename not found');
  }
  if (!body.mimetype) {
    throw new BadRequestError('Mimetype not found');
  }
  if (!body.type) {
    throw new BadRequestError('Type not found');
  }
  return body as ResultFile;
};

export const handler = async (event: APIGatewayEvent, _ctx: Context) => {
  try {
    await parser(event);
    const file = validateFile(event.body as any);
    const output = await fileFacadeFactory.uploadFile({
      reference_type: file.type,
      files: [
        {
          filename: file.filename,
          mimetype: file.mimetype,
          createReadStream: () => file.file,
        },
      ],
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

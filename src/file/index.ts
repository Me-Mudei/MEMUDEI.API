import { APIGatewayEvent, Context } from 'aws-lambda';
import Busboy from 'busboy';
import { FileInMemoryFacadeFactory } from './infra';
import { Readable } from 'node:stream';
import { ReadStream } from 'node:tty';

const fileFacadeFactory = FileInMemoryFacadeFactory.create();

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
      headers: {
        'content-type': getContentType(event),
      },
    });

    const result: any = {
      file: '',
      filename: '',
      contentType: '',
    };

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      file.on('data', (data) => {
        result.file = data;
      });

      file.on('end', () => {
        result.filename = filename;
        result.contentType = mimetype;
      });
    });

    busboy.on('field', (fieldname, value) => {
      result[fieldname] = value;
    });

    busboy.on('error', (error: any) => reject(error));
    busboy.on('finish', () => {
      event.body = result;
      resolve(event);
    });

    busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
    busboy.end();
  });

export const handler = async (event: APIGatewayEvent, context: Context) => {
  await parser(event);
  const file: Buffer = (event.body as any).file;
  const stream = Readable.from(file);
  await fileFacadeFactory.uploadFile({
    reference_type: 'property',
    files: [
      {
        filename: 'test',
        mimetype: 'image/png',
        encoding: 'base64',
        createReadStream: () => stream,
      },
    ],
  });

  return {
    statusCode: 200,
  };
};

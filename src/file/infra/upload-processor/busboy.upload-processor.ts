import Busboy from 'busboy';
import { UploadFileInput } from '../../app';
import { BadRequestError } from '#shared/domain';

type BusboyFile = {
  file?: Buffer;
  filename?: string;
  encoding?: string;
  mimetype?: string;
};

export type BusboyBody = {
  files?: BusboyFile[];
  type?: UploadFileInput['reference_type'];
};

type ParserInput = {
  body: {
    [key: string]: any;
  };
  isBase64Encoded: boolean;
  headers: {
    [name: string]: string | undefined;
  };
};

export class BusboyUploadProcessor {
  static async parser(event: ParserInput) {
    return new Promise((resolve, reject) => {
      const busboy = Busboy({
        headers: {
          'content-type':
            event.headers['content-type'] || event.headers['Content-Type'],
        },
      });

      const result: BusboyBody = {
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
        new BusboyUploadProcessor().validateFile(result, reject);
        event.body = result;
        resolve(event);
      });

      busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
      busboy.end();
    });
  }

  validateFile(body: BusboyBody, reject: (error: any) => void) {
    if (!body.files || body.files?.length === 0) {
      reject(new BadRequestError('Files not found'));
    }
    if (!body.type) {
      reject(new BadRequestError('Type not found'));
    }
    body.files.forEach((file: any) => {
      if (!file.filename) {
        reject(new BadRequestError('Filename not found'));
      }
      if (!file.file) {
        reject(new BadRequestError(`File not found - ${file.filename}`));
      }
      if (!file.mimetype) {
        reject(new BadRequestError(`Mimetype not found - ${file.filename}`));
      }
    });
  }
}

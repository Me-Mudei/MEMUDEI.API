import { APIGatewayEvent, Context } from 'aws-lambda';
import { FileFacadeFactory, BusboyUploadProcessor, BusboyBody } from './infra';

const fileFacadeFactory = FileFacadeFactory.create();

export const handler = async (event: APIGatewayEvent, _ctx: Context) => {
  try {
    await BusboyUploadProcessor.parser(event as any);
    const body = event.body as BusboyBody;
    const output = await fileFacadeFactory.uploadFile({
      reference_type: body.type,
      files: body.files.map(({ file, filename, mimetype }) => ({
        filename: filename,
        mimetype: mimetype,
        createReadStream: () => file,
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

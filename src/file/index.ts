import { APIGatewayEvent, Context } from 'aws-lambda';
import { FileFacadeFactory, BusboyUploadProcessor, BusboyBody } from './infra';
import { AuthFacadeFactory } from '#auth/infra';
import { UnauthorizedError } from '#shared/domain';

const fileFacadeFactory = FileFacadeFactory.create();
const authService = AuthFacadeFactory.create();

export const handler = async (event: APIGatewayEvent, _ctx: Context) => {
  try {
    await BusboyUploadProcessor.parser(event as any);
    const body = event.body as BusboyBody;
    const token =
      event.headers['authorization'] || event.headers['Authorization'];
    const { permissions } = await authService.authenticate({ token });
    if (!permissions.includes(`upload:${body.type}`)) {
      throw new UnauthorizedError();
    }
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
    const statusCode = {
      BadRequestError: 400,
      UnauthorizedError: 401,
      NotFoundError: 404,
      ValidationError: 422,
      InternalServerError: 500,
    };
    const errorBody = {
      errors: [
        {
          type: error.name || 'InternalServerError',
          message: error.message,
        },
      ],
    };
    return {
      statusCode: statusCode[error.name] || 500,
      body: JSON.stringify(errorBody),
      contentType: 'application/json',
    };
  }
};

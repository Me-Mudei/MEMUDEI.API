import { AuthFacadeFactory } from "#auth/infra";
import { APIGatewayEvent, Context } from "aws-lambda";

import { FileFacadeFactory } from "./infra";

const fileFacadeFactory = FileFacadeFactory.create();
const authService = AuthFacadeFactory.create();

export const handler = async (event: APIGatewayEvent, _ctx: Context) => {
  /* await BusboyUploadProcessor.parser(event as any);
  const body = event.body as BusboyBody; */
  //const token =
  //  event.headers["authorization"] || event.headers["Authorization"];
  //const { permissions } = await authService.authenticate({ token });
  //if (!permissions.includes(`upload:${body.type}`)) {
  //  throw new UnauthorizedError();
  //}
  /* const output = await fileFacadeFactory.uploadFile({
    reference_type: body.type,
    files: body.files.map(({ file, filename, mimetype }) => ({
      filename: filename,
      mimetype: mimetype,
      createReadStream: () => file
    }))
  }); */
  return {
    statusCode: 200,
    body: JSON.stringify({
      test: "test",
      data: "data"
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "content-type": "application/json"
    }
  };
};

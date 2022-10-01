import { UserFacade } from '@me-mudei/core/dist/user/app/facade';
import { InMemoryFacadeFactory as User } from '@me-mudei/core/user';
import { APIGatewayEventRequestContextWithAuthorizer } from 'aws-lambda';

export class Context {
  user: UserFacade;
  getContext(req: APIGatewayEventRequestContextWithAuthorizer<any>) {
    const loggerReq = {
      req_id: req.requestId,
      req_path: req.path,
      req_method: req.httpMethod,
      req_ua: req.identity.userAgent,
    };
    this.user = new User(loggerReq).create();
    return this;
  }
}

import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import Auth0 from '../auth/Auth0';
import Broker from '../broker/Broker';
import PrismaDAOFactory from '../factory/PrismaDAOFactory';

export default class Context {
  email?: string;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly DAOFactory: PrismaDAOFactory,
    readonly broker: Broker
  ) {}

  async getContext(req: any): Promise<Context> {
    const token = req.headers.authorization;
    const auth0 = new Auth0(token);
    const decode = await auth0.validToken();
    this.email = decode.email;
    return this;
  }
}

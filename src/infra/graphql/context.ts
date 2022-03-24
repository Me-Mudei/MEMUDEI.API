import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import Broker from '../broker/Broker';
import PrismaDAOFactory from '../factory/PrismaDAOFactory';

export default class Context {
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly DAOFactory: PrismaDAOFactory,
    readonly broker: Broker
  ) {}
}

import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import Broker from '../broker';

export default class Context {
  email?: string;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {}

  getContext(): Context {
    return this;
  }
}

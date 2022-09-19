import RepositoryFactory from "./domain/factory/RepositoryFactory";
import Broker from "../../@core/@shared/infra/broker/broker";

export default class Context {
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {}

  getContext(): Context {
    return this;
  }
}

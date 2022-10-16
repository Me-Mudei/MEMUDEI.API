import { Property, PropertyCreated, PropertyRepository } from '../../domain';
import { Broker } from '../../../shared/infra/';
import { CreatePropertyInput, PropertyOutput } from '../dto';
import { UseCase } from '../../../shared/app';
import { LoggerInterface } from '../../../shared/infra/logger/logger.interface';
import { WinstonLogger } from '../../../shared/infra/logger/winston.logger';

export class CreatePropertyUseCase
  implements UseCase<CreatePropertyInput, PropertyOutput>
{
  logger: LoggerInterface;
  constructor(
    readonly propertyRepository: PropertyRepository.Repository,
    readonly broker: Broker,
    logger?: LoggerInterface,
  ) {
    !!logger
      ? (this.logger = logger)
      : (this.logger = new WinstonLogger({
          svc: 'CreatePropertyUseCase',
          req: {
            req_id: 'test',
            req_path: 'test',
            req_method: 'test',
            req_ua: 'test',
          },
        }));
  }

  async execute(input: CreatePropertyInput): Promise<PropertyOutput> {
    this.logger.info({ message: 'Start Property Use Case' });
    const property = new Property({
      email: input.email,
      name: input.name,
      role_name: input.role_name,
    });
    await this.propertyRepository.insert(property);
    await this.broker.publish(new PropertyCreated(property));
    return property.toJSON();
  }
}

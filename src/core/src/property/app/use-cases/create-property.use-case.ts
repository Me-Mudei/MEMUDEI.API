import { UseCase } from '#shared/app';
import { UniqueEntityId } from '#shared/domain';
import { Broker, LoggerInterface, WinstonLogger } from '#shared/infra';
import { PropertyRepository } from '../../domain/repository';
import { RepositoryFactory } from '../../domain/factory';
import {
  CreatePropertyInput,
  CreatePropertyOutput,
  CreatePropertyOutputMapper,
} from '../dto';
import { Driver } from '../../domain/driver';
import {
  Address,
  Charge,
  FloorPlan,
  Photo,
  Property,
  CondominiumDetail,
  PropertyDetail,
  Rule,
} from '../../domain/entities';

export class CreatePropertyUseCase
  implements UseCase<CreatePropertyInput, CreatePropertyOutput>
{
  propertyRepository: PropertyRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly driver: Driver,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.propertyRepository = repositoryFactory.createPropertyRepository();
  }

  async execute(input: CreatePropertyInput): Promise<CreatePropertyOutput> {
    this.logger.info({ message: 'Start Property Use Case' });
    const address = new Address({
      zip_code: input.address.zip_code,
      city: input.address.city,
      state: input.address.state,
      street: input.address.street,
      district: input.address.district,
      complement: input.address.complement,
    });
    const propertyDetails = input.property_details.map((propertyDetail) => {
      return new PropertyDetail({
        key: propertyDetail.key,
        available: propertyDetail.available,
      });
    });
    const floorPlans = input.floor_plans.map((floorPlan) => {
      return new FloorPlan({
        key: floorPlan.key,
        value: floorPlan.value,
      });
    });
    const charges = input.charges.map((charge) => {
      return new Charge({
        key: charge.key,
        amount: charge.amount,
      });
    });
    const condominiumDetails = input.condominium_details.map(
      (condominiumDetail) => {
        return new CondominiumDetail({
          key: condominiumDetail.key,
          available: condominiumDetail.available,
        });
      },
    );
    const rules = input.rules.map((rule) => {
      return new Rule({
        key: rule.key,
        allowed: rule.allowed,
      });
    });

    const property = new Property({
      title: input.title,
      description: input.description,
      status: input.status,
      address: address,
      property_type: input.property_type,
      property_relationship: input.property_relationship,
      privacy_type: input.privacy_type,
      floor_plans: floorPlans,
      property_details: propertyDetails,
      condominium_details: condominiumDetails,
      rules: rules,
      charges: charges,
      user_id: new UniqueEntityId(input.user_id),
    });
    const files = await this.driver.uploadMany(input.photos, `${property.id}`);
    this.logger.info({ message: 'Files uploaded' });
    const photos = files.map((file) => {
      return new Photo({
        file: file.filename,
        name: file.filename,
        type: file.mimetype.split('/')[0],
        subtype: file.mimetype.split('/')[1],
        url: file.url,
      });
    });
    property.photos = photos;
    await this.propertyRepository.insert(property);
    return CreatePropertyOutputMapper.toOutput(property);
  }
}

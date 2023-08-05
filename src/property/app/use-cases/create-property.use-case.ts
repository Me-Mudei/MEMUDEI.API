import { UseCase } from "#shared/app";
import { UniqueEntityId } from "#shared/domain";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import {
  Address,
  Charge,
  FloorPlan,
  Property,
  CondominiumDetail,
  PropertyDetail,
  Rule,
  Location,
  Photo
} from "../../domain/entities";
import { RepositoryFactory } from "../../domain/factory";
import { PropertyRepository } from "../../domain/repository";
import {
  CreatePropertyInput,
  CreatePropertyOutput,
  CreatePropertyOutputMapper
} from "../dto";

export class CreatePropertyUseCase
  implements UseCase<CreatePropertyInput, CreatePropertyOutput>
{
  propertyRepository: PropertyRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.propertyRepository = repositoryFactory.createPropertyRepository();
  }

  async execute(input: CreatePropertyInput): Promise<CreatePropertyOutput> {
    this.logger.info({ message: "Start Property Use Case" });
    const location = new Location({
      lat: input.address.location.lat,
      lng: input.address.location.lng
    });
    const address = new Address({
      zip_code: input.address.zip_code,
      city: input.address.city,
      state: input.address.state,
      street: input.address.street,
      country: input.address.country,
      location,
      district: input.address.district,
      complement: input.address.complement
    });
    const property_details = input.property_details.map((propertyDetail) => {
      return new PropertyDetail({
        key: propertyDetail.key,
        available: propertyDetail.available
      });
    });
    const condominium_details = input.condominium_details.map(
      (condominiumDetail) => {
        return new CondominiumDetail({
          key: condominiumDetail.key,
          available: condominiumDetail.available
        });
      }
    );
    const floor_plans = input.floor_plans.map((floorPlan) => {
      return new FloorPlan({
        key: floorPlan.key,
        value: floorPlan.value
      });
    });
    const charges = input.charges.map((charge) => {
      return new Charge({
        key: charge.key,
        amount: charge.amount
      });
    });
    const rules = input.rules.map((rule) => {
      return new Rule({
        key: rule.key,
        allowed: rule.allowed
      });
    });

    const photos = input.photos.map((photo) => {
      return new Photo({
        url: photo.url,
        filename: photo.filename,
        position: photo.position,
        type: photo.type,
        subtype: photo.subtype,
        description: photo.description
      });
    });

    const property = new Property({
      title: input.title,
      description: input.description,
      status: input.status,
      property_type: input.property_type,
      property_relationship: input.property_relationship,
      privacy_type: input.privacy_type,
      address,
      floor_plans,
      property_details,
      condominium_details,
      rules,
      charges,
      photos,
      user_id: new UniqueEntityId(input.user_id)
    });

    await this.propertyRepository.insert(property);
    return CreatePropertyOutputMapper.toOutput(property);
  }
}

import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import { UseCase } from '#shared/app';
import {
  PropertyRepository,
  PropertyTypeRepository,
  PrivacyTypeRepository,
  PropertyRelationshipRepository,
  PropertyDetailRepository,
  CondominiumDetailRepository,
  RuleRepository,
} from '../../../domain/repository';
import { RepositoryFactory } from '../../../domain/factory';
import {
  Address,
  Charge,
  FloorPlan,
  Photo,
  Property,
} from '../../../domain/entities';
import {
  CreatePropertyInput,
  PropertyOutput,
  PropertyOutputMapper,
} from '../../dto';
import { Driver } from '../../../domain/driver';

export class CreatePropertyUseCase
  implements UseCase<CreatePropertyInput, PropertyOutput>
{
  propertyTypeRepository: PropertyTypeRepository;
  privacyTypeRepository: PrivacyTypeRepository;
  propertyRelationshipRepository: PropertyRelationshipRepository;
  propertyDetailRepository: PropertyDetailRepository;
  condominiumDetailRepository: CondominiumDetailRepository;
  ruleRepository: RuleRepository;
  propertyRepository: PropertyRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly driver: Driver,
    readonly broker: Broker,
  ) {
    this.logger = SingletonLogger.getInstance();
    this.propertyTypeRepository =
      repositoryFactory.createPropertyTypeRepository();
    this.privacyTypeRepository =
      repositoryFactory.createPrivacyTypeRepository();
    this.propertyRelationshipRepository =
      repositoryFactory.createPropertyRelationshipRepository();
    this.propertyDetailRepository =
      repositoryFactory.createPropertyDetailRepository();
    this.condominiumDetailRepository =
      repositoryFactory.createCondominiumDetailRepository();
    this.ruleRepository = repositoryFactory.createRuleRepository();
    this.propertyRepository = repositoryFactory.createPropertyRepository();
  }

  async execute(input: CreatePropertyInput): Promise<PropertyOutput> {
    this.logger.info({ message: 'Start Property Use Case' });
    const address = new Address({
      zip_code: input.address.zip_code,
      city: input.address.city,
      state: input.address.state,
      street: input.address.street,
      district: input.address.district,
      complement: input.address.complement,
    });
    const floorPlans = input.floor_plans.map(
      (floorPlan) =>
        new FloorPlan({
          name: floorPlan.name,
          quantity: floorPlan.quantity,
          unit: floorPlan.unit,
        }),
    );

    const charges = input.charges.map(
      (charge) =>
        new Charge({
          name: charge.name,
          amount: charge.amount,
        }),
    );
    const propertyType = await this.propertyTypeRepository.findById(
      input.property_type_id,
    );
    const privacyType = await this.privacyTypeRepository.findById(
      input.privacy_type_id,
    );
    const propertyRelationship =
      await this.propertyRelationshipRepository.findById(
        input.property_relationship_id,
      );
    const propertyDetails = await this.propertyDetailRepository.findManyById(
      input.property_details.map((propertyDetail) => propertyDetail.id),
    );

    propertyDetails.map((propertyDetail) => {
      propertyDetail.available = input.property_details.find(
        (propertyDetailInput) => propertyDetailInput.id === propertyDetail.id,
      ).available;
    });
    const condominiumDetails =
      await this.condominiumDetailRepository.findManyById(
        input.condominium_details.map(
          (condominiumDetail) => condominiumDetail.id,
        ),
      );
    condominiumDetails.map((condominiumDetail) => {
      condominiumDetail.available = input.condominium_details.find(
        (condominiumDetailInput) =>
          condominiumDetailInput.id === condominiumDetail.id,
      ).available;
    });
    const rules = await this.ruleRepository.findManyById(
      input.rules.map((rule) => rule.id),
    );
    rules.map((rule) => {
      rule.allowed = input.rules.find(
        (ruleInput) => ruleInput.id === rule.id,
      ).allowed;
    });
    //const schedule = new Schedule({});

    const property = new Property({
      title: input.title,
      description: input.description,
      status: input.status,
      address: address,
      property_type: propertyType,
      property_relationship: propertyRelationship,
      privacy_type: privacyType,
      floor_plans: floorPlans,
      //schedule: schedule,
      property_details: propertyDetails,
      condominium_details: condominiumDetails,
      rules: rules,
      charges: charges,
    });
    this.logger.info({ message: 'Property created' });
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
    return PropertyOutputMapper.toOutput(property);
  }
}

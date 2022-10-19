import {
  Address,
  Charge,
  FloorPlan,
  Photo,
  Property,
  PropertyRepository,
  PropertyTypeRepository,
  PrivacyTypeRepository,
  PropertyRelationshipRepository,
  PropertyDetailRepository,
  CondominiumDetailRepository,
  RuleRepository,
  RepositoryFactory,
} from '../../domain';
import { Broker } from '../../../shared/infra/';
import { CreatePropertyInput, PropertyOutput } from '../dto';
import { UseCase } from '../../../shared/app';
import { LoggerInterface } from '../../../shared/infra/logger/logger.interface';

export class CreatePropertyUseCase
  implements UseCase<CreatePropertyInput, PropertyOutput>
{
  propertyTypeRepository: PropertyTypeRepository;
  privacyTypeRepository: PrivacyTypeRepository;
  propertyRelationshipRepository: PropertyRelationshipRepository;
  propertyDetailRepository: PropertyDetailRepository;
  condominiumDetailRepository: CondominiumDetailRepository;
  ruleRepository: RuleRepository;
  propertyRepository: PropertyRepository.Repository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
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
    const photos = input.photos.map(
      (photo) =>
        new Photo({
          description: photo.description,
          file: photo.file,
          name: photo.name,
          type: photo.type,
          subtype: photo.subtype,
          url: photo.url,
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
    const propertyDetails = await this.propertyDetailRepository.findManyByIds(
      input.property_details.map((propertyDetail) => propertyDetail.id),
    );

    propertyDetails.map((propertyDetail) => {
      propertyDetail.available = input.property_details.find(
        (propertyDetailInput) => propertyDetailInput.id === propertyDetail.id,
      ).available;
    });
    const condominiumDetails =
      await this.condominiumDetailRepository.findManyByIds(
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
    const rules = await this.ruleRepository.findManyByIds(
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
      photos: photos,
      charges: charges,
    });
    await this.propertyRepository.insert(property);
    return {
      id: property.id,
      title: property.title,
      description: property.description,
      status: property.status,
      created_at: property.created_at,
      updated_at: property.updated_at,
      address: {
        id: property.address.id,
        zip_code: property.address.zip_code,
        city: property.address.city,
        state: property.address.state,
        street: property.address.street,
        district: property.address.district,
        complement: property.address.complement,
      },
      property_type: {
        id: property.property_type.id,
        name: property.property_type.name,
      },
      property_relationship: {
        id: property.property_relationship.id,
        name: property.property_relationship.name,
      },
      privacy_type: {
        id: property.privacy_type.id,
        name: property.privacy_type.name,
      },
      floor_plans: property.floor_plans.map((floorPlan) => ({
        id: floorPlan.id,
        name: floorPlan.name,
        quantity: floorPlan.quantity,
        unit: floorPlan.unit,
      })),
      property_details: property.property_details.map((propertyDetail) => ({
        id: propertyDetail.id,
        name: propertyDetail.name,
        available: propertyDetail.available,
      })),
      condominium_details: property.condominium_details.map(
        (condominiumDetail) => ({
          id: condominiumDetail.id,
          name: condominiumDetail.name,
          available: condominiumDetail.available,
        }),
      ),
      rules: property.rules.map((rule) => ({
        id: rule.id,
        name: rule.name,
        allowed: rule.allowed,
      })),
      photos: property.photos.map((photo) => ({
        id: photo.id,
        description: photo.description,
        file: photo.file,
        name: photo.name,
        type: photo.type,
        subtype: photo.subtype,
        url: photo.url,
      })),
      charges: property.charges.map((charge) => ({
        id: charge.id,
        name: charge.name,
        amount: charge.amount,
      })),
    };
  }
}

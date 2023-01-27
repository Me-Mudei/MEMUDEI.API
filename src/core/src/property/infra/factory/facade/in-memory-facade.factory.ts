import {
  CreatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertyUseCase,
  GetPropertyTypeUseCase,
  SearchPropertyTypeUseCase,
  CreatePropertyTypeUseCase,
  UpdatePropertyTypeUseCase,
  DeletePropertyTypeUseCase,
  GetPropertyRelationshipUseCase,
  SearchPropertyRelationshipUseCase,
  CreatePropertyRelationshipUseCase,
  UpdatePropertyRelationshipUseCase,
  DeletePropertyRelationshipUseCase,
  GetPrivacyTypeUseCase,
  SearchPrivacyTypeUseCase,
  CreatePrivacyTypeUseCase,
  UpdatePrivacyTypeUseCase,
  DeletePrivacyTypeUseCase,
  GetPropertyDetailUseCase,
  SearchPropertyDetailUseCase,
  CreatePropertyDetailUseCase,
  UpdatePropertyDetailUseCase,
  DeletePropertyDetailUseCase,
  GetCondominiumDetailUseCase,
  SearchCondominiumDetailUseCase,
  CreateCondominiumDetailUseCase,
  UpdateCondominiumDetailUseCase,
  DeleteCondominiumDetailUseCase,
  GetRuleUseCase,
  SearchRuleUseCase,
  CreateRuleUseCase,
  UpdateRuleUseCase,
  DeleteRuleUseCase,
} from '../../../app/use-cases';
import { PropertyFacade } from '../../../app/facade';
import {
  CondominiumDetailFakeBuilder,
  PrivacyTypeFakeBuilder,
  PropertyDetailFakeBuilder,
  PropertyFakeBuilder,
  PropertyRelationshipFakeBuilder,
  PropertyTypeFakeBuilder,
  RuleFakeBuilder,
} from '#property/domain';
import { UniqueEntityId } from '#shared/domain';
import { Broker, ReqLoggerProps, WinstonLogger } from '#shared/infra';
import { InMemoryRepositoryFactory } from '../repository';
import { InMemoryDriver } from '../../driver';

export class InMemoryFacadeFactory {
  static create(req: ReqLoggerProps) {
    new WinstonLogger({
      svc: 'testSvc',
      req: {
        req_id: req.req_id,
        req_path: req.req_path,
        req_method: req.req_method,
        req_ua: req.req_ua,
      },
    });
    const repositoryFactory = new InMemoryRepositoryFactory();
    const id = new UniqueEntityId('9micktlceY2WicUyvJKq3');
    const propertyItems = [
      PropertyFakeBuilder.aProperty().withId(id).build(),
      ...PropertyFakeBuilder.theProperties(15).build(),
      ...PropertyFakeBuilder.theProperties(5).withTitle('Casa').build(),
      ...PropertyFakeBuilder.theProperties(3).withTitle('test').build(),
    ];
    const property_type_id = new UniqueEntityId('-qAJnuQ9yyjAixr3kA0qV');
    const propertyTypeItems = [
      PropertyTypeFakeBuilder.aPropertyType().withId(property_type_id).build(),
    ];
    const property_relationship_id = new UniqueEntityId(
      'XVGl_wQH_qY-Ib12c4fdH',
    );
    const propertyRelationshipItems = [
      PropertyRelationshipFakeBuilder.aPropertyRelationship()
        .withId(property_relationship_id)
        .build(),
    ];
    const privacy_type_id = new UniqueEntityId('W6gVuFYhw9hdJjqZhfyR5');
    const privacyTypeItems = [
      PrivacyTypeFakeBuilder.aPrivacyType().withId(privacy_type_id).build(),
    ];
    const property_detail_id = new UniqueEntityId('WzpOAqMrbs0B-wL2nldyi');
    const property_detail_id2 = new UniqueEntityId('bvS8JBf9S9310FSDaUfss');
    const propertyDetailItems = [
      PropertyDetailFakeBuilder.aPropertyDetail()
        .withId(property_detail_id)
        .build(),
      PropertyDetailFakeBuilder.aPropertyDetail()
        .withId(property_detail_id2)
        .build(),
    ];
    const condominium_detail_id = new UniqueEntityId('ofPD2D4pPFJ2WNmdoeBrt');
    const condominium_detail_id2 = new UniqueEntityId('NxSfKX56NoptjKXERlZ52');
    const condominiumDetailItems = [
      CondominiumDetailFakeBuilder.aCondominiumDetail()
        .withId(condominium_detail_id)
        .build(),
      CondominiumDetailFakeBuilder.aCondominiumDetail()
        .withId(condominium_detail_id2)
        .build(),
    ];
    const rule_id = new UniqueEntityId('CEiQmjH2zKOZ37yuzQHfA');
    const rule_id2 = new UniqueEntityId('QKhIxaf8BTzuZnsTOfVU4');
    const ruleItems = [
      RuleFakeBuilder.aRule().withId(rule_id).build(),
      RuleFakeBuilder.aRule().withId(rule_id2).build(),
    ];

    const driver = new InMemoryDriver();
    const broker = new Broker();

    const createPropertyUseCase = new CreatePropertyUseCase(
      repositoryFactory,
      driver,
      broker,
    );
    const getPropertyUseCase = new GetPropertyUseCase(
      repositoryFactory,
      broker,
    );
    const searchPropertyUseCase = new SearchPropertyUseCase(
      repositoryFactory,
      broker,
    );
    const getPropertyTypeUseCase = new GetPropertyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const searchPropertyTypeUseCase = new SearchPropertyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const createPropertyTypeUseCase = new CreatePropertyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const updatePropertyTypeUseCase = new UpdatePropertyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const deletePropertyTypeUseCase = new DeletePropertyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const getPropertyRelationshipUseCase = new GetPropertyRelationshipUseCase(
      repositoryFactory,
      broker,
    );
    const searchPropertyRelationshipUseCase =
      new SearchPropertyRelationshipUseCase(repositoryFactory, broker);
    const createPropertyRelationshipUseCase =
      new CreatePropertyRelationshipUseCase(repositoryFactory, broker);
    const updatePropertyRelationshipUseCase =
      new UpdatePropertyRelationshipUseCase(repositoryFactory, broker);
    const deletePropertyRelationshipUseCase =
      new DeletePropertyRelationshipUseCase(repositoryFactory, broker);
    const getPrivacyTypeUseCase = new GetPrivacyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const searchPrivacyTypeUseCase = new SearchPrivacyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const createPrivacyTypeUseCase = new CreatePrivacyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const updatePrivacyTypeUseCase = new UpdatePrivacyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const deletePrivacyTypeUseCase = new DeletePrivacyTypeUseCase(
      repositoryFactory,
      broker,
    );
    const getPropertyDetailUseCase = new GetPropertyDetailUseCase(
      repositoryFactory,
      broker,
    );
    const searchPropertyDetailUseCase = new SearchPropertyDetailUseCase(
      repositoryFactory,
      broker,
    );
    const createPropertyDetailUseCase = new CreatePropertyDetailUseCase(
      repositoryFactory,
      broker,
    );
    const updatePropertyDetailUseCase = new UpdatePropertyDetailUseCase(
      repositoryFactory,
      broker,
    );
    const deletePropertyDetailUseCase = new DeletePropertyDetailUseCase(
      repositoryFactory,
      broker,
    );
    const getCondominiumDetailUseCase = new GetCondominiumDetailUseCase(
      repositoryFactory,
      broker,
    );
    const searchCondominiumDetailUseCase = new SearchCondominiumDetailUseCase(
      repositoryFactory,
      broker,
    );
    const createCondominiumDetailUseCase = new CreateCondominiumDetailUseCase(
      repositoryFactory,
      broker,
    );
    const updateCondominiumDetailUseCase = new UpdateCondominiumDetailUseCase(
      repositoryFactory,
      broker,
    );
    const deleteCondominiumDetailUseCase = new DeleteCondominiumDetailUseCase(
      repositoryFactory,
      broker,
    );
    const getRuleUseCase = new GetRuleUseCase(repositoryFactory, broker);
    const searchRuleUseCase = new SearchRuleUseCase(repositoryFactory, broker);
    const createRuleUseCase = new CreateRuleUseCase(repositoryFactory, broker);
    const updateRuleUseCase = new UpdateRuleUseCase(repositoryFactory, broker);
    const deleteRuleUseCase = new DeleteRuleUseCase(repositoryFactory, broker);

    searchPropertyUseCase['propertyRepository']['items'] = propertyItems;
    getPropertyUseCase['propertyRepository']['items'] = propertyItems;
    createPropertyUseCase['propertyTypeRepository']['items'] =
      propertyTypeItems;
    createPropertyUseCase['propertyRelationshipRepository']['items'] =
      propertyRelationshipItems;
    createPropertyUseCase['privacyTypeRepository']['items'] = privacyTypeItems;
    createPropertyUseCase['propertyDetailRepository']['items'] =
      propertyDetailItems;
    createPropertyUseCase['condominiumDetailRepository']['items'] =
      condominiumDetailItems;
    createPropertyUseCase['ruleRepository']['items'] = ruleItems;

    return new PropertyFacade({
      createProperty: createPropertyUseCase,
      getProperty: getPropertyUseCase,
      searchProperty: searchPropertyUseCase,
      getPropertyType: getPropertyTypeUseCase,
      searchPropertyType: searchPropertyTypeUseCase,
      createPropertyType: createPropertyTypeUseCase,
      updatePropertyType: updatePropertyTypeUseCase,
      deletePropertyType: deletePropertyTypeUseCase,
      getPropertyRelationship: getPropertyRelationshipUseCase,
      searchPropertyRelationship: searchPropertyRelationshipUseCase,
      createPropertyRelationship: createPropertyRelationshipUseCase,
      updatePropertyRelationship: updatePropertyRelationshipUseCase,
      deletePropertyRelationship: deletePropertyRelationshipUseCase,
      getPrivacyType: getPrivacyTypeUseCase,
      searchPrivacyType: searchPrivacyTypeUseCase,
      createPrivacyType: createPrivacyTypeUseCase,
      updatePrivacyType: updatePrivacyTypeUseCase,
      deletePrivacyType: deletePrivacyTypeUseCase,
      getPropertyDetail: getPropertyDetailUseCase,
      searchPropertyDetail: searchPropertyDetailUseCase,
      createPropertyDetail: createPropertyDetailUseCase,
      updatePropertyDetail: updatePropertyDetailUseCase,
      deletePropertyDetail: deletePropertyDetailUseCase,
      getCondominiumDetail: getCondominiumDetailUseCase,
      searchCondominiumDetail: searchCondominiumDetailUseCase,
      createCondominiumDetail: createCondominiumDetailUseCase,
      updateCondominiumDetail: updateCondominiumDetailUseCase,
      deleteCondominiumDetail: deleteCondominiumDetailUseCase,
      getRule: getRuleUseCase,
      searchRule: searchRuleUseCase,
      createRule: createRuleUseCase,
      updateRule: updateRuleUseCase,
      deleteRule: deleteRuleUseCase,
    });
  }
}

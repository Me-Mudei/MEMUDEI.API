import { Broker, ReqLoggerProps, WinstonLogger } from "#shared/infra";

import { AdmFacade } from "../../../app/facade";
import {
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
  GetChargeUseCase,
  SearchChargeUseCase,
  CreateChargeUseCase,
  UpdateChargeUseCase,
  DeleteChargeUseCase,
  GetFloorPlanUseCase,
  SearchFloorPlanUseCase,
  CreateFloorPlanUseCase,
  UpdateFloorPlanUseCase,
  DeleteFloorPlanUseCase
} from "../../../app/use-cases";
import { PrismaRepositoryFactory } from "../repository";

export class PrismaFacadeFactory {
  static create(req: ReqLoggerProps) {
    new WinstonLogger({
      svc: "testSvc",
      req: {
        req_id: req.req_id,
        req_path: req.req_path,
        req_method: req.req_method,
        req_ua: req.req_ua
      }
    });
    const repositoryFactory = new PrismaRepositoryFactory();

    const broker = new Broker();

    const getPropertyTypeUseCase = new GetPropertyTypeUseCase(
      repositoryFactory,
      broker
    );
    const searchPropertyTypeUseCase = new SearchPropertyTypeUseCase(
      repositoryFactory,
      broker
    );
    const createPropertyTypeUseCase = new CreatePropertyTypeUseCase(
      repositoryFactory,
      broker
    );
    const updatePropertyTypeUseCase = new UpdatePropertyTypeUseCase(
      repositoryFactory,
      broker
    );
    const deletePropertyTypeUseCase = new DeletePropertyTypeUseCase(
      repositoryFactory,
      broker
    );
    const getPropertyRelationshipUseCase = new GetPropertyRelationshipUseCase(
      repositoryFactory,
      broker
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
      broker
    );
    const searchPrivacyTypeUseCase = new SearchPrivacyTypeUseCase(
      repositoryFactory,
      broker
    );
    const createPrivacyTypeUseCase = new CreatePrivacyTypeUseCase(
      repositoryFactory,
      broker
    );
    const updatePrivacyTypeUseCase = new UpdatePrivacyTypeUseCase(
      repositoryFactory,
      broker
    );
    const deletePrivacyTypeUseCase = new DeletePrivacyTypeUseCase(
      repositoryFactory,
      broker
    );
    const getPropertyDetailUseCase = new GetPropertyDetailUseCase(
      repositoryFactory,
      broker
    );
    const searchPropertyDetailUseCase = new SearchPropertyDetailUseCase(
      repositoryFactory,
      broker
    );
    const createPropertyDetailUseCase = new CreatePropertyDetailUseCase(
      repositoryFactory,
      broker
    );
    const updatePropertyDetailUseCase = new UpdatePropertyDetailUseCase(
      repositoryFactory,
      broker
    );
    const deletePropertyDetailUseCase = new DeletePropertyDetailUseCase(
      repositoryFactory,
      broker
    );
    const getCondominiumDetailUseCase = new GetCondominiumDetailUseCase(
      repositoryFactory,
      broker
    );
    const searchCondominiumDetailUseCase = new SearchCondominiumDetailUseCase(
      repositoryFactory,
      broker
    );
    const createCondominiumDetailUseCase = new CreateCondominiumDetailUseCase(
      repositoryFactory,
      broker
    );
    const updateCondominiumDetailUseCase = new UpdateCondominiumDetailUseCase(
      repositoryFactory,
      broker
    );
    const deleteCondominiumDetailUseCase = new DeleteCondominiumDetailUseCase(
      repositoryFactory,
      broker
    );
    const getRuleUseCase = new GetRuleUseCase(repositoryFactory, broker);
    const searchRuleUseCase = new SearchRuleUseCase(repositoryFactory, broker);
    const createRuleUseCase = new CreateRuleUseCase(repositoryFactory, broker);
    const updateRuleUseCase = new UpdateRuleUseCase(repositoryFactory, broker);
    const deleteRuleUseCase = new DeleteRuleUseCase(repositoryFactory, broker);
    const getChargeUseCase = new GetChargeUseCase(repositoryFactory, broker);
    const searchChargeUseCase = new SearchChargeUseCase(
      repositoryFactory,
      broker
    );
    const createChargeUseCase = new CreateChargeUseCase(
      repositoryFactory,
      broker
    );
    const updateChargeUseCase = new UpdateChargeUseCase(
      repositoryFactory,
      broker
    );
    const deleteChargeUseCase = new DeleteChargeUseCase(
      repositoryFactory,
      broker
    );
    const getFloorPlanUseCase = new GetFloorPlanUseCase(
      repositoryFactory,
      broker
    );
    const searchFloorPlanUseCase = new SearchFloorPlanUseCase(
      repositoryFactory,
      broker
    );
    const createFloorPlanUseCase = new CreateFloorPlanUseCase(
      repositoryFactory,
      broker
    );
    const updateFloorPlanUseCase = new UpdateFloorPlanUseCase(
      repositoryFactory,
      broker
    );
    const deleteFloorPlanUseCase = new DeleteFloorPlanUseCase(
      repositoryFactory,
      broker
    );

    return new AdmFacade({
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
      getCharge: getChargeUseCase,
      searchCharge: searchChargeUseCase,
      createCharge: createChargeUseCase,
      updateCharge: updateChargeUseCase,
      deleteCharge: deleteChargeUseCase,
      getFloorPlan: getFloorPlanUseCase,
      searchFloorPlan: searchFloorPlanUseCase,
      createFloorPlan: createFloorPlanUseCase,
      updateFloorPlan: updateFloorPlanUseCase,
      deleteFloorPlan: deleteFloorPlanUseCase
    });
  }
}

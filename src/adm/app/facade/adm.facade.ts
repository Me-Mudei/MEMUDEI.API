import { SearchInputDto, PaginationOutputDto } from "#shared/app/";

import {
  CreatePropertyTypeInput,
  UpdatePropertyTypeInput,
  PropertyTypeOutput,
  CreatePropertyRelationshipInput,
  UpdatePropertyRelationshipInput,
  PropertyRelationshipOutput,
  CreatePrivacyTypeInput,
  UpdatePrivacyTypeInput,
  PrivacyTypeOutput,
  CreatePropertyDetailInput,
  UpdatePropertyDetailInput,
  PropertyDetailOutput,
  CreateCondominiumDetailInput,
  UpdateCondominiumDetailInput,
  CondominiumDetailOutput,
  CreateRuleInput,
  UpdateRuleInput,
  RuleOutput,
  CreateChargeInput,
  UpdateChargeInput,
  ChargeOutput,
  CreateFloorPlanInput,
  UpdateFloorPlanInput,
  FloorPlanOutput,
} from "../dto";
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
  DeleteFloorPlanUseCase,
} from "../use-cases";

export interface AdmFacadeProps {
  getPropertyType: GetPropertyTypeUseCase;
  searchPropertyType: SearchPropertyTypeUseCase;
  createPropertyType: CreatePropertyTypeUseCase;
  updatePropertyType: UpdatePropertyTypeUseCase;
  deletePropertyType: DeletePropertyTypeUseCase;

  getPropertyRelationship: GetPropertyRelationshipUseCase;
  searchPropertyRelationship: SearchPropertyRelationshipUseCase;
  createPropertyRelationship: CreatePropertyRelationshipUseCase;
  updatePropertyRelationship: UpdatePropertyRelationshipUseCase;
  deletePropertyRelationship: DeletePropertyRelationshipUseCase;

  getPrivacyType: GetPrivacyTypeUseCase;
  searchPrivacyType: SearchPrivacyTypeUseCase;
  createPrivacyType: CreatePrivacyTypeUseCase;
  updatePrivacyType: UpdatePrivacyTypeUseCase;
  deletePrivacyType: DeletePrivacyTypeUseCase;
  getPropertyDetail: GetPropertyDetailUseCase;

  searchPropertyDetail: SearchPropertyDetailUseCase;
  createPropertyDetail: CreatePropertyDetailUseCase;
  updatePropertyDetail: UpdatePropertyDetailUseCase;
  deletePropertyDetail: DeletePropertyDetailUseCase;

  getCondominiumDetail: GetCondominiumDetailUseCase;
  searchCondominiumDetail: SearchCondominiumDetailUseCase;
  createCondominiumDetail: CreateCondominiumDetailUseCase;
  updateCondominiumDetail: UpdateCondominiumDetailUseCase;
  deleteCondominiumDetail: DeleteCondominiumDetailUseCase;

  getRule: GetRuleUseCase;
  searchRule: SearchRuleUseCase;
  createRule: CreateRuleUseCase;
  updateRule: UpdateRuleUseCase;
  deleteRule: DeleteRuleUseCase;

  getCharge: GetChargeUseCase;
  searchCharge: SearchChargeUseCase;
  createCharge: CreateChargeUseCase;
  updateCharge: UpdateChargeUseCase;
  deleteCharge: DeleteChargeUseCase;

  getFloorPlan: GetFloorPlanUseCase;
  searchFloorPlan: SearchFloorPlanUseCase;
  createFloorPlan: CreateFloorPlanUseCase;
  updateFloorPlan: UpdateFloorPlanUseCase;
  deleteFloorPlan: DeleteFloorPlanUseCase;
}

export class AdmFacade {
  private _getPropertyType: GetPropertyTypeUseCase;
  private _searchPropertyType: SearchPropertyTypeUseCase;
  private _createPropertyType: CreatePropertyTypeUseCase;
  private _updatePropertyType: UpdatePropertyTypeUseCase;
  private _deletePropertyType: DeletePropertyTypeUseCase;
  private _getPropertyRelationship: GetPropertyRelationshipUseCase;
  private _searchPropertyRelationship: SearchPropertyRelationshipUseCase;
  private _createPropertyRelationship: CreatePropertyRelationshipUseCase;
  private _updatePropertyRelationship: UpdatePropertyRelationshipUseCase;
  private _deletePropertyRelationship: DeletePropertyRelationshipUseCase;
  private _getPrivacyType: GetPrivacyTypeUseCase;
  private _searchPrivacyType: SearchPrivacyTypeUseCase;
  private _createPrivacyType: CreatePrivacyTypeUseCase;
  private _updatePrivacyType: UpdatePrivacyTypeUseCase;
  private _deletePrivacyType: DeletePrivacyTypeUseCase;
  private _getPropertyDetail: GetPropertyDetailUseCase;
  private _searchPropertyDetail: SearchPropertyDetailUseCase;
  private _createPropertyDetail: CreatePropertyDetailUseCase;
  private _updatePropertyDetail: UpdatePropertyDetailUseCase;
  private _deletePropertyDetail: DeletePropertyDetailUseCase;
  private _getCondominiumDetail: GetCondominiumDetailUseCase;
  private _searchCondominiumDetail: SearchCondominiumDetailUseCase;
  private _createCondominiumDetail: CreateCondominiumDetailUseCase;
  private _updateCondominiumDetail: UpdateCondominiumDetailUseCase;
  private _deleteCondominiumDetail: DeleteCondominiumDetailUseCase;
  private _getRule: GetRuleUseCase;
  private _searchRule: SearchRuleUseCase;
  private _createRule: CreateRuleUseCase;
  private _updateRule: UpdateRuleUseCase;
  private _deleteRule: DeleteRuleUseCase;
  private _getCharge: GetChargeUseCase;
  private _searchCharge: SearchChargeUseCase;
  private _createCharge: CreateChargeUseCase;
  private _updateCharge: UpdateChargeUseCase;
  private _deleteCharge: DeleteChargeUseCase;
  private _getFloorPlan: GetFloorPlanUseCase;
  private _searchFloorPlan: SearchFloorPlanUseCase;
  private _createFloorPlan: CreateFloorPlanUseCase;
  private _updateFloorPlan: UpdateFloorPlanUseCase;
  private _deleteFloorPlan: DeleteFloorPlanUseCase;

  constructor(readonly props: AdmFacadeProps) {
    this._getPropertyType = props.getPropertyType;
    this._searchPropertyType = props.searchPropertyType;
    this._createPropertyType = props.createPropertyType;
    this._updatePropertyType = props.updatePropertyType;
    this._deletePropertyType = props.deletePropertyType;
    this._getPropertyRelationship = props.getPropertyRelationship;
    this._searchPropertyRelationship = props.searchPropertyRelationship;
    this._createPropertyRelationship = props.createPropertyRelationship;
    this._updatePropertyRelationship = props.updatePropertyRelationship;
    this._deletePropertyRelationship = props.deletePropertyRelationship;
    this._getPrivacyType = props.getPrivacyType;
    this._searchPrivacyType = props.searchPrivacyType;
    this._createPrivacyType = props.createPrivacyType;
    this._updatePrivacyType = props.updatePrivacyType;
    this._deletePrivacyType = props.deletePrivacyType;
    this._getPropertyDetail = props.getPropertyDetail;
    this._searchPropertyDetail = props.searchPropertyDetail;
    this._createPropertyDetail = props.createPropertyDetail;
    this._updatePropertyDetail = props.updatePropertyDetail;
    this._deletePropertyDetail = props.deletePropertyDetail;
    this._getCondominiumDetail = props.getCondominiumDetail;
    this._searchCondominiumDetail = props.searchCondominiumDetail;
    this._createCondominiumDetail = props.createCondominiumDetail;
    this._updateCondominiumDetail = props.updateCondominiumDetail;
    this._deleteCondominiumDetail = props.deleteCondominiumDetail;
    this._getRule = props.getRule;
    this._searchRule = props.searchRule;
    this._createRule = props.createRule;
    this._updateRule = props.updateRule;
    this._deleteRule = props.deleteRule;
    this._getCharge = props.getCharge;
    this._searchCharge = props.searchCharge;
    this._createCharge = props.createCharge;
    this._updateCharge = props.updateCharge;
    this._deleteCharge = props.deleteCharge;
    this._getFloorPlan = props.getFloorPlan;
    this._searchFloorPlan = props.searchFloorPlan;
    this._createFloorPlan = props.createFloorPlan;
    this._updateFloorPlan = props.updateFloorPlan;
    this._deleteFloorPlan = props.deleteFloorPlan;
  }
  async getPropertyType(input: { id: string }): Promise<PropertyTypeOutput> {
    return this._getPropertyType.execute(input);
  }
  async searchPropertyType(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<PropertyTypeOutput>> {
    return this._searchPropertyType.execute(input);
  }
  async createPropertyType(
    input: CreatePropertyTypeInput,
  ): Promise<PropertyTypeOutput> {
    return this._createPropertyType.execute(input);
  }
  async updatePropertyType(
    input: UpdatePropertyTypeInput,
  ): Promise<PropertyTypeOutput> {
    return this._updatePropertyType.execute(input);
  }
  async deletePropertyType(input: { id: string }): Promise<void> {
    return this._deletePropertyType.execute(input);
  }
  async getPropertyRelationship(input: {
    id: string;
  }): Promise<PropertyRelationshipOutput> {
    return this._getPropertyRelationship.execute(input);
  }
  async searchPropertyRelationship(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<PropertyRelationshipOutput>> {
    return this._searchPropertyRelationship.execute(input);
  }
  async createPropertyRelationship(
    input: CreatePropertyRelationshipInput,
  ): Promise<PropertyRelationshipOutput> {
    return this._createPropertyRelationship.execute(input);
  }
  async updatePropertyRelationship(
    input: UpdatePropertyRelationshipInput,
  ): Promise<PropertyRelationshipOutput> {
    return this._updatePropertyRelationship.execute(input);
  }
  async deletePropertyRelationship(input: { id: string }): Promise<void> {
    return this._deletePropertyRelationship.execute(input);
  }
  async getPrivacyType(input: { id: string }): Promise<PrivacyTypeOutput> {
    return this._getPrivacyType.execute(input);
  }
  async searchPrivacyType(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<PrivacyTypeOutput>> {
    return this._searchPrivacyType.execute(input);
  }
  async createPrivacyType(
    input: CreatePrivacyTypeInput,
  ): Promise<PrivacyTypeOutput> {
    return this._createPrivacyType.execute(input);
  }
  async updatePrivacyType(
    input: UpdatePrivacyTypeInput,
  ): Promise<PrivacyTypeOutput> {
    return this._updatePrivacyType.execute(input);
  }
  async deletePrivacyType(input: { id: string }): Promise<void> {
    return this._deletePrivacyType.execute(input);
  }
  async getPropertyDetail(input: {
    id: string;
  }): Promise<PropertyDetailOutput> {
    return this._getPropertyDetail.execute(input);
  }
  async searchPropertyDetail(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<PropertyDetailOutput>> {
    return this._searchPropertyDetail.execute(input);
  }
  async createPropertyDetail(
    input: CreatePropertyDetailInput,
  ): Promise<PropertyDetailOutput> {
    return this._createPropertyDetail.execute(input);
  }
  async updatePropertyDetail(
    input: UpdatePropertyDetailInput,
  ): Promise<PropertyDetailOutput> {
    return this._updatePropertyDetail.execute(input);
  }
  async deletePropertyDetail(input: { id: string }): Promise<void> {
    return this._deletePropertyDetail.execute(input);
  }
  async getCondominiumDetail(input: {
    id: string;
  }): Promise<CondominiumDetailOutput> {
    return this._getCondominiumDetail.execute(input);
  }
  async searchCondominiumDetail(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<CondominiumDetailOutput>> {
    return this._searchCondominiumDetail.execute(input);
  }
  async createCondominiumDetail(
    input: CreateCondominiumDetailInput,
  ): Promise<CondominiumDetailOutput> {
    return this._createCondominiumDetail.execute(input);
  }
  async updateCondominiumDetail(
    input: UpdateCondominiumDetailInput,
  ): Promise<CondominiumDetailOutput> {
    return this._updateCondominiumDetail.execute(input);
  }
  async deleteCondominiumDetail(input: { id: string }): Promise<void> {
    return this._deleteCondominiumDetail.execute(input);
  }
  async getRule(input: { id: string }): Promise<RuleOutput> {
    return this._getRule.execute(input);
  }
  async searchRule(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<RuleOutput>> {
    return this._searchRule.execute(input);
  }
  async createRule(input: CreateRuleInput): Promise<RuleOutput> {
    return this._createRule.execute(input);
  }
  async updateRule(input: UpdateRuleInput): Promise<RuleOutput> {
    return this._updateRule.execute(input);
  }
  async deleteRule(input: { id: string }): Promise<void> {
    return this._deleteRule.execute(input);
  }
  async getCharge(input: { id: string }): Promise<ChargeOutput> {
    return this._getCharge.execute(input);
  }
  async searchCharge(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<ChargeOutput>> {
    return this._searchCharge.execute(input);
  }
  async createCharge(input: CreateChargeInput): Promise<ChargeOutput> {
    return this._createCharge.execute(input);
  }
  async updateCharge(input: UpdateChargeInput): Promise<ChargeOutput> {
    return this._updateCharge.execute(input);
  }
  async deleteCharge(input: { id: string }): Promise<void> {
    return this._deleteCharge.execute(input);
  }
  async getFloorPlan(input: { id: string }): Promise<FloorPlanOutput> {
    return this._getFloorPlan.execute(input);
  }
  async searchFloorPlan(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<FloorPlanOutput>> {
    return this._searchFloorPlan.execute(input);
  }
  async createFloorPlan(input: CreateFloorPlanInput): Promise<FloorPlanOutput> {
    return this._createFloorPlan.execute(input);
  }
  async updateFloorPlan(input: UpdateFloorPlanInput): Promise<FloorPlanOutput> {
    return this._updateFloorPlan.execute(input);
  }
  async deleteFloorPlan(input: { id: string }): Promise<void> {
    return this._deleteFloorPlan.execute(input);
  }
}

import { objectType, inputObjectType, enumType } from 'nexus';

export const CreatePropertyInput = inputObjectType({
  name: 'create_property_input',
  definition(t) {
    t.nonNull.string('title');
    t.nonNull.string('description');
    t.nullable.field('status', { type: 'property_status' });
    t.nonNull.field('address', { type: 'address_input' });
    t.nonNull.string('property_type_id');
    t.nonNull.string('property_relationship_id');
    t.nonNull.string('privacy_type_id');
    t.nonNull.list.nonNull.field('floor_plans', { type: 'floor_plan_input' });
    t.nonNull.list.nonNull.field('property_details', {
      type: 'property_detail_input',
    });
    t.nonNull.list.nonNull.field('condominium_details', {
      type: 'condominium_detail_input',
    });
    t.nonNull.list.nonNull.field('rules', { type: 'rule_input' });
    t.nullable.list.nonNull.upload('photos');
    t.nonNull.list.nonNull.field('charges', { type: 'charge_input' });
  },
});

export const GetPropertyInput = inputObjectType({
  name: 'get_property_input',
  definition(t) {
    t.nonNull.string('id');
  },
});

export const AddressInput = inputObjectType({
  name: 'address_input',
  definition(t) {
    t.nonNull.string('zip_code');
    t.nonNull.string('city');
    t.nonNull.string('state');
    t.nonNull.string('street');
    t.nonNull.string('district');
    t.nullable.string('complement');
  },
});

export const FloorPlanInput = inputObjectType({
  name: 'floor_plan_input',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.int('quantity');
    t.nullable.string('unit');
  },
});

export const PropertyDetailInput = inputObjectType({
  name: 'property_detail_input',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.boolean('available');
  },
});

export const CondominiumDetailInput = inputObjectType({
  name: 'condominium_detail_input',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.boolean('available');
  },
});

export const RuleInput = inputObjectType({
  name: 'rule_input',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.boolean('allowed');
  },
});

export const ChargeInput = inputObjectType({
  name: 'charge_input',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.int('amount');
  },
});

export const PropertyStatus = enumType({
  name: 'property_status',
  members: ['pending', 'completed'],
});

export const PropertyOutput = objectType({
  name: 'property_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('title');
    t.nonNull.string('description');
    t.nullable.field('status', { type: 'property_status' });
    t.nonNull.field('address', { type: 'address_output' });
    t.nonNull.field('property_type', { type: 'property_type_output' });
    t.nonNull.field('property_relationship', {
      type: 'property_relationship_output',
    });
    t.nonNull.field('privacy_type', { type: 'privacy_type_output' });
    t.nonNull.list.nonNull.field('floor_plans', { type: 'floor_plan_output' });
    t.nonNull.list.nonNull.field('property_details', {
      type: 'property_property_detail_output',
    });
    t.nonNull.list.nonNull.field('condominium_details', {
      type: 'property_condominium_detail_output',
    });
    t.nonNull.list.nonNull.field('rules', { type: 'property_rule_output' });
    t.nonNull.list.nullable.field('photos', { type: 'photo_output' });
    t.nonNull.list.nonNull.field('charges', { type: 'charge_output' });
    t.nonNull.date('created_at');
    t.nonNull.date('updated_at');
  },
});

export const AddressOutput = objectType({
  name: 'address_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('zip_code');
    t.nonNull.string('city');
    t.nonNull.string('state');
    t.nonNull.string('street');
    t.nonNull.string('district');
    t.nullable.string('complement');
  },
});

export const FloorPlanOutput = objectType({
  name: 'floor_plan_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nonNull.int('quantity');
    t.nullable.string('unit');
  },
});

export const PropertyPropertyDetailOutput = objectType({
  name: 'property_property_detail_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nullable.string('description');
    t.nonNull.boolean('available');
  },
});

export const PropertyCondominiumDetailOutput = objectType({
  name: 'property_condominium_detail_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nullable.string('description');
    t.nonNull.boolean('available');
  },
});

export const PropertyRuleOutput = objectType({
  name: 'property_rule_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nullable.string('description');
    t.nonNull.boolean('allowed');
  },
});

export const PhotoOutput = objectType({
  name: 'photo_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('url');
    t.nonNull.string('file');
    t.nonNull.string('name');
    t.nonNull.string('type');
    t.nonNull.string('subtype');
    t.nullable.string('description');
  },
});

export const ChargeOutput = objectType({
  name: 'charge_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nonNull.int('amount');
  },
});

export const PropertyFilterInput = inputObjectType({
  name: 'property_filter_input',
  definition(t) {
    t.nullable.string('id');
    t.nullable.string('query');
    t.nullable.string('status');
    t.nullable.string('property_type');
    t.nullable.string('privacy_type');
    t.nullable.list.string('property_details');
    t.nullable.list.string('condominium_details');
    t.nullable.list.string('rules');
    t.nullable.string('value_type');
    t.nullable.float('min_value');
    t.nullable.float('max_value');
    t.nullable.int('min_area');
    t.nullable.int('max_area');
    t.nullable.int('qtd_bedrooms');
    t.nullable.int('qtd_bathrooms');
  },
});

export const PropertySearchInput = inputObjectType({
  name: 'search_properties_input',
  definition(t) {
    t.nullable.int('page');
    t.nullable.int('per_page');
    t.nullable.string('sort');
    t.nullable.field('sort_dir', { type: 'sort_direction' });
    t.nullable.field('filter', { type: 'property_filter_input' });
  },
});

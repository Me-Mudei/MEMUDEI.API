import { inputObjectType, enumType } from 'nexus';

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
    t.nonNull.list.nonNull.upload('photos');
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

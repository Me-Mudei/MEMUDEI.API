import { objectType } from 'nexus';

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
      type: 'property_detail_output',
    });
    t.nonNull.list.nonNull.field('condominium_details', {
      type: 'condominium_detail_output',
    });
    t.nonNull.list.nonNull.field('rules', { type: 'rule_output' });
    t.nonNull.list.nonNull.field('photos', { type: 'photo_output' });
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

export const PropertyTypeOutput = objectType({
  name: 'property_type_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nullable.string('description');
  },
});

export const PropertyRelationshipOutput = objectType({
  name: 'property_relationship_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nullable.string('description');
  },
});

export const PrivacyTypeOutput = objectType({
  name: 'privacy_type_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nullable.string('description');
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

export const ScheduleOutput = objectType({
  name: 'schedule_output',
  definition(t) {
    t.nonNull.string('id');
  },
});

export const PropertyDetailOutput = objectType({
  name: 'property_detail_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nullable.string('description');
    t.nonNull.boolean('available');
  },
});

export const CondominiumDetailOutput = objectType({
  name: 'condominium_detail_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nullable.string('description');
    t.nonNull.boolean('available');
  },
});

export const RuleOutput = objectType({
  name: 'rule_output',
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

import { PropertyOutput as CorePropertyOutput } from '@me-mudei/core/dist/property/app/dto';
import { NexusGenEnums, NexusGenObjects } from 'generated/nexus';
import { objectType } from 'nexus';

export const CreatePropertyOutput = objectType({
  name: 'create_property_output',
  definition(t) {
    t.nonNull.string('id');
    t.nullable.field('status', { type: 'property_status' });
    t.nonNull.date('created_at');
    t.nonNull.date('updated_at');
  },
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

export const PropertyFloorPlanOutput = objectType({
  name: 'property_floor_plan_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('key');
    t.nonNull.string('name');
    t.nonNull.int('value');
    t.nullable.string('unit');
  },
});

export const PropertyPropertyDetailOutput = objectType({
  name: 'property_property_detail_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('key');
    t.nonNull.string('name');
    t.nullable.string('description');
    t.nonNull.boolean('available');
  },
});

export const PropertyCondominiumDetailOutput = objectType({
  name: 'property_condominium_detail_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('key');
    t.nonNull.string('name');
    t.nullable.string('description');
    t.nonNull.boolean('available');
  },
});

export const PropertyRuleOutput = objectType({
  name: 'property_rule_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('key');
    t.nonNull.string('name');
    t.nullable.string('description');
    t.nonNull.boolean('allowed');
  },
});

export const PropertyChargeOutput = objectType({
  name: 'property_charge_output',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('key');
    t.nonNull.string('name');
    t.nonNull.string('description');
    t.nonNull.int('amount');
  },
});

export class CreatePropertyOutputMapper {
  static toOutput(
    property: CorePropertyOutput,
  ): NexusGenObjects['create_property_output'] {
    return {
      id: property.id,
      status: property.status as NexusGenEnums['property_status'],
      created_at: property.created_at,
      updated_at: property.updated_at,
    };
  }
}

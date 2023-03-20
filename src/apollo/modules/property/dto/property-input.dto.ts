import { CreatePropertyInput as CoreCreatePropertyInput } from '../../../../property/app';
import {
  PropertyStatus as CorePropertyStatus,
  FileInput,
} from '../../../../property/domain';
import { User } from '../../../context';
import { inputObjectType } from 'nexus';
import { NexusGenInputs } from 'apollo/generated/nexus';

export const CreatePropertyInput = inputObjectType({
  name: 'create_property_input',
  definition(t) {
    t.nonNull.string('title');
    t.nonNull.string('description');
    t.nullable.field('status', { type: 'property_status' });
    t.nonNull.field('address', { type: 'address_input' });
    t.nonNull.string('property_type');
    t.nonNull.string('property_relationship');
    t.nonNull.string('privacy_type');
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
    t.nonNull.string('key');
    t.nonNull.int('value');
  },
});

export const PropertyDetailInput = inputObjectType({
  name: 'property_detail_input',
  definition(t) {
    t.nonNull.string('key');
    t.nonNull.boolean('available');
  },
});

export const CondominiumDetailInput = inputObjectType({
  name: 'condominium_detail_input',
  definition(t) {
    t.nonNull.string('key');
    t.nonNull.boolean('available');
  },
});

export const RuleInput = inputObjectType({
  name: 'rule_input',
  definition(t) {
    t.nonNull.string('key');
    t.nonNull.boolean('allowed');
  },
});

export const ChargeInput = inputObjectType({
  name: 'charge_input',
  definition(t) {
    t.nonNull.string('key');
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
    t.nullable.int('min_footage');
    t.nullable.int('max_footage');
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

export class CreatePropertyInputMapper {
  static async toInput(input: {
    property: NexusGenInputs['create_property_input'];
    user: User;
  }): Promise<CoreCreatePropertyInput> {
    let photos: FileInput[] = [];
    if (input.property.photos) {
      photos = await Promise.all(input.property.photos.map((photo) => photo));
    }
    return {
      ...input.property,
      user_id: input.user.id,
      photos,
      status: input.property.status as CorePropertyStatus,
    };
  }
}

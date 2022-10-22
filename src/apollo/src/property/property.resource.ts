import { createWriteStream } from 'fs';
import {
  mutationField,
  queryField,
  nullable,
  nonNull,
  objectType,
  inputObjectType,
} from 'nexus';
import { ReadStream } from 'tty';
import { isAdmin } from '../shared/rules';

export const CreateProperty = mutationField('create_property', {
  type: 'property_output',
  shield: isAdmin(),
  args: { input: nonNull('create_property_input') },
  resolve: async (_, { input }, ctx) => {
    const photos = await Promise.all(input.photos.map((photo) => photo));
    const res = ctx.propertyService.createProperty({ ...input, photos } as any);
    return res as any;
  },
});

export const GetProperty = queryField('get_property', {
  type: 'property_output',
  args: { input: nonNull('get_property_input') },
  resolve: async (_, { input }, ctx) => {
    const res = ctx.propertyService.getProperty(input);
    return res as any;
  },
});

export const SearchProperties = queryField('search_properties', {
  type: 'pagination_output',
  shield: isAdmin(),
  args: { input: nullable('search_input') },
  resolve: async (_, { input }, ctx) => {
    const res = ctx.propertyService.searchProperty(input as any);
    return res as any;
  },
});

export const PhotoUpload = mutationField('photo_upload', {
  type: 'photo_upload_output',
  args: { file: nonNull('photo_upload_input') },
  resolve: async (_, { file }, ctx) => {
    const fi = await file.file;

    fi.createReadStream().pipe(
      createWriteStream(`${__dirname}/${fi.filename}`),
    );
    return { status: 'ok' };
  },
});

export const PhotoUploadOutput = objectType({
  name: 'photo_upload_output',
  definition(t) {
    t.nonNull.string('status');
  },
});

export const PhotoUploadInput = inputObjectType({
  name: 'photo_upload_input',
  definition(t) {
    t.nonNull.upload('file');
  },
});

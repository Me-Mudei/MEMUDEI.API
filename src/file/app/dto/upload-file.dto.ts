import { FileInput } from '../../domain/driver';

export type UploadFileInput = {
  reference_type: 'property';
  files: FileInput[];
};

export type UploadFileOutput = {
  id: string;
  url: string;
  file: string;
  name: string;
  type: string;
  subtype: string;
  description?: string;
}[];

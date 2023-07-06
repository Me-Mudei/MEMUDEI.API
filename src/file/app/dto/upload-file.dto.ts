import { FileInput } from '../../domain/driver';

export type UploadFileInput = {
  reference_id: string;
  files: FileInput[];
};

export type FileOutput = {
  id: string;
  url: string;
  file: string;
  name: string;
  type: string;
  subtype: string;
  description?: string;
}[];

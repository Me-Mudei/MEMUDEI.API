import { FileInput } from "../../domain/driver";

export type UploadFileInput = {
  reference_type: "property";
  files: FileInput[];
};

export type UploadFileOutput = {
  id: string;
  url: string;
  filename: string;
  type: string;
  subtype: string;
}[];

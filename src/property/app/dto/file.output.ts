import { File } from "../../domain";

export interface FileOutput {
  id: string;
  filename: string;
  type: string;
  subtype: string;
  url: string;
  position: number;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export class FileOutputMapper {
  static toOutput(file: File): FileOutput {
    return {
      id: file.id,
      filename: file.filename,
      type: file.type,
      subtype: file.subtype,
      url: file.url,
      position: file.position,
      description: file.description,
      created_at: file.created_at,
      updated_at: file.updated_at,
    };
  }
}

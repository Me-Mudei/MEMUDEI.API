import { Media } from "../../domain";

export interface FileOutput {
  id: string;
  filename: string;
  type: string;
  subtype: string;
  url: string;
}

export interface MediaOutput {
  file: FileOutput;
  position: number;
  description?: string;
}

export class MediaOutputMapper {
  static toOutput(media: Media): MediaOutput {
    return {
      file: {
        id: media.file.id,
        filename: media.file.filename,
        type: media.file.type,
        subtype: media.file.subtype,
        url: media.file.url,
      },
      position: media.position,
      description: media.description,
    };
  }
}

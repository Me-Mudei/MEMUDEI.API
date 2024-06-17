import { Media } from "../../domain";

export interface FileOutput {
  id: string;
  name: string;
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
        name: media.file.name,
        type: media.file.type,
        subtype: media.file.subtype,
        url: media.file.url,
      },
      position: media.position,
      description: media.description,
    };
  }
}

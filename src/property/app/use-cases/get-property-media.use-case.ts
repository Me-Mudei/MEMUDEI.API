import { Media, File } from "#property/domain";
import { UseCase } from "#shared/app";
import { UniqueEntityId } from "#shared/domain";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import { MediaOutput, MediaOutputMapper } from "../dto";

export class GetPropertyMediaUseCase
  implements UseCase<{ property_id: string }, MediaOutput[]>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: { property_id: string }): Promise<MediaOutput[]> {
    this.logger.info({ message: "Start Property Use Case" });
    const foundMedias = await this.prisma.propertyMedia.findMany({
      where: { property_id: input.property_id },
      include: { file: true },
    });
    const files = foundMedias.map((media) => {
      return new Media({
        file: new File({
          id: new UniqueEntityId(media.file.id),
          filename: media.file.filename,
          type: media.file.type,
          subtype: media.file.subtype,
          url: media.file.url,
        }),
        position: media.position,
        description: media.description,
      });
    });
    return files.map(MediaOutputMapper.toOutput);
  }
}

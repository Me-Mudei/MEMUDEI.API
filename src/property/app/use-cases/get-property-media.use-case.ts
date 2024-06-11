import { File } from "#property/domain";
import { UseCase } from "#shared/app";
import { UniqueEntityId } from "#shared/domain";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import { FileOutput, FileOutputMapper } from "../dto";

export class GetPropertyMediaUseCase
  implements UseCase<{ property_id: string }, FileOutput[]>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: { property_id: string }): Promise<FileOutput[]> {
    this.logger.info({ message: "Start Property Use Case" });
    const foundFiles = await this.prisma.file.findMany({
      where: { property_id: input.property_id },
    });
    const files = foundFiles.map((file) => {
      return new File({
        id: new UniqueEntityId(file.id),
        filename: file.filename,
        type: file.type,
        subtype: file.subtype,
        url: file.url,
        position: file.position,
        description: file.description,
        created_at: file.created_at,
        updated_at: file.updated_at,
      });
    });
    return files.map(FileOutputMapper.toOutput);
  }
}

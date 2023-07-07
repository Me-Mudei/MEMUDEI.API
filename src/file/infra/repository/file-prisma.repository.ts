import { File } from '../../domain/entities';
import { FileRepository } from '../../domain/repository';
import { Prisma, PrismaClient } from '#shared/infra';
import { UniqueEntityId } from '#shared/domain';

export class FilePrismaRepository implements FileRepository {
  constructor(readonly prisma: PrismaClient) {}
  async insert(files: File[]): Promise<void> {
    await this.prisma.file.createMany({
      data: files.map((file) => ({
        id: file.id,
        url: file.url,
        file: file.file,
        name: file.name,
        subtype: file.subtype,
        type: file.type,
        description: file.description,
        created_at: file.created_at,
        updated_at: file.updated_at,
      })),
    });
  }

  async findById(id: string | UniqueEntityId): Promise<File> {
    const file = await this.prisma.file.findFirst({
      where: { id: id.toString() },
    });
    return this.toEntity(file);
  }

  async update(entity: File): Promise<void> {
    await this.prisma.file.update({
      where: { id: entity.id },
      data: {},
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.prisma.file.delete({
      where: { id: id.toString() },
    });
  }

  private toEntity(
    file: Prisma.fileGetPayload<Prisma.fileFindUniqueArgs>,
  ): File {
    return new File({
      id: new UniqueEntityId(file.id),
      url: file.url,
      file: file.file,
      name: file.name,
      subtype: file.subtype,
      type: file.type,
      description: file.description,
      created_at: file.created_at,
      updated_at: file.updated_at,
    });
  }
}

import { GetPropertyMediaUseCase, PropertyMediaFacade } from "#property/app";
import { Connection } from "#shared/infra";

export class PropertyMediaFacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const getPropertyMedia = new GetPropertyMediaUseCase(prisma);

    return new PropertyMediaFacade({
      getPropertyMedia,
    });
  }
}

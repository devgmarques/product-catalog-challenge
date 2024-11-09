import { NotExistError } from "@/application/errors/errors"
import { CatalogsRepository } from "@/application/protocols/database"
import { IDeleteCatalogUseCase } from "@/domain/use-cases/catalogs"

export class DeleteCatalogUseCase implements IDeleteCatalogUseCase {
  constructor (
    private catalogsRepository: CatalogsRepository,
  ) {}

  async execute(input: IDeleteCatalogUseCase.Input): IDeleteCatalogUseCase.Output {
    const catalogExists = await this.catalogsRepository.findById({
      catalogId: input.catalogId,
      userId: input.userId
    })
    
    if(!catalogExists) {
      throw new NotExistError("Catalog")
    }

    await this.catalogsRepository.delete({
      catalogId: input.catalogId,
      userId: input.userId,
    })
  }
} 

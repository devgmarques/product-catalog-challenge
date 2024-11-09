import { NotExistError } from "@/application/errors/errors"
import { CatalogsRepository } from "@/application/protocols/database"
import { IUpdateCatalogUseCase } from "@/domain/use-cases/catalogs"

export class UpdateCatalogUseCase implements IUpdateCatalogUseCase {
  constructor (
    private catalogsRepository: CatalogsRepository,
  ) {}

  async execute(input: IUpdateCatalogUseCase.Input): IUpdateCatalogUseCase.Output {
    const catalogExists = await this.catalogsRepository.findById({
      catalogId: input.catalogId,
      userId: input.userId
    })
    
    if(!catalogExists) {
      throw new NotExistError("Catalog")
    }

    const catalog = await this.catalogsRepository.update({
      catalogId: input.catalogId,
      userId: input.userId,
      title: input.title,
      description: input.description
    })

    return catalog
  }
} 

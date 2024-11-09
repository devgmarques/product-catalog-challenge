import { CatalogsRepository } from "@/application/protocols/database"
import { IFetchCatalogUseCase } from "@/domain/use-cases/catalogs"

export class FetchCatalogUseCase implements IFetchCatalogUseCase {
  constructor (
    private catalogsRepository: CatalogsRepository,
  ) {}

  async execute(input: IFetchCatalogUseCase.Input): IFetchCatalogUseCase.Output {
    const catalogs = await this.catalogsRepository.fetch({
      userId: input.userId
    })

    return catalogs
  }
} 

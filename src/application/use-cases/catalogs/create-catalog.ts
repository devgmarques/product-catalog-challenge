import { CatalogsRepository } from "@/application/protocols/database"
import { ICreateCatalogUseCase } from "@/domain/use-cases/catalogs"

export class CreateCatalogUseCase implements ICreateCatalogUseCase {
  constructor (
    private catalogsRepository: CatalogsRepository,
  ) {}

  async execute(input: ICreateCatalogUseCase.Input): ICreateCatalogUseCase.Output {
    // TODO => fazer alguma regra de negocio

    const catalog = await this.catalogsRepository.create({
      userId: input.userId,
      title: input.title,
      description: input.description
    })

    return catalog
  }
} 

import { CreateCatalogUseCase } from "@/application/use-cases/catalogs"
import { CreateCatalogController } from "@/presentation/controllers/catalogs"

import { PrismaCatalogsRepository } from "@/infra/database/prisma/repositories"

export function makeCreateCatalogController() {
    const catalogsRepository = new PrismaCatalogsRepository()

    const createCatalogUseCase = new CreateCatalogUseCase(catalogsRepository)
    return new CreateCatalogController(createCatalogUseCase)
}
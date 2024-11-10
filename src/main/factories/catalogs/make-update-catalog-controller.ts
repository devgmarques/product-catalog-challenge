import { UpdateCatalogUseCase } from "@/application/use-cases/catalogs"
import { UpdateCatalogController } from "@/presentation/controllers/catalogs"

import { PrismaCatalogsRepository } from "@/infra/database/prisma/repositories"

export function makeUpdateCatalogController() {
    const catalogsRepository = new PrismaCatalogsRepository()

    const updateCatalogUseCase = new UpdateCatalogUseCase(catalogsRepository)
    return new UpdateCatalogController(updateCatalogUseCase)
}
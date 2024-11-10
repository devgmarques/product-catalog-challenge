import { DeleteCatalogUseCase } from "@/application/use-cases/catalogs"
import { DeleteCatalogController } from "@/presentation/controllers/catalogs"

import { PrismaCatalogsRepository } from "@/infra/database/prisma/repositories"

export function makeDeleteCatalogController() {
    const catalogsRepository = new PrismaCatalogsRepository()

    const deleteCatalogUseCase = new DeleteCatalogUseCase(catalogsRepository)
    return new DeleteCatalogController(deleteCatalogUseCase)
}
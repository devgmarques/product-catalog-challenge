import { FetchCatalogUseCase } from "@/application/use-cases/catalogs"
import { FetchCatalogController } from "@/presentation/controllers/catalogs"

import { PrismaCatalogsRepository } from "@/infra/database/prisma/repositories"

export function makeFetchCatalogController() {
    const catalogsRepository = new PrismaCatalogsRepository()

    const fetchCatalogUseCase = new FetchCatalogUseCase(catalogsRepository)
    return new FetchCatalogController(fetchCatalogUseCase)
}
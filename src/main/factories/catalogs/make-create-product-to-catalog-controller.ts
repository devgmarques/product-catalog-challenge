import { CreateProductToCatalogUseCase } from "@/application/use-cases/catalogs"
import { CreateProductToCatalogController } from "@/presentation/controllers/catalogs"

import { PrismaCatalogsRepository, PrismaProductsRepository } from "@/infra/database/prisma/repositories"

export function makeCreateProductToCatalogController() {
    const catalogsRepository = new PrismaCatalogsRepository()
    const productsRepository = new PrismaProductsRepository()

    const createProductToCatalogUseCase = new CreateProductToCatalogUseCase(catalogsRepository, productsRepository)
    return new CreateProductToCatalogController(createProductToCatalogUseCase)
}
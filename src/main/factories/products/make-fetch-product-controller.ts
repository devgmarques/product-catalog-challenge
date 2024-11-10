import { FetchProductUseCase } from "@/application/use-cases/products"
import { FetchProductController } from "@/presentation/controllers/products"

import { PrismaProductsRepository } from "@/infra/database/prisma/repositories"

export function makeFetchProductController() {
    const productsRepository = new PrismaProductsRepository()

    const fetchProductUseCase = new FetchProductUseCase(productsRepository)
    return new FetchProductController(fetchProductUseCase)
}
import { CreateProductUseCase } from "@/application/use-cases/products"
import { CreateProductController } from "@/presentation/controllers/products"

import { PrismaProductsRepository } from "@/infra/database/prisma/repositories"

export function makeCreateProductController() {
    const productsRepository = new PrismaProductsRepository()

    const createProductUseCase = new CreateProductUseCase(productsRepository)
    return new CreateProductController(createProductUseCase)
}
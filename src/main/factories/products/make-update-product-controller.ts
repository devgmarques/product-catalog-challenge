import { UpdateProductUseCase } from "@/application/use-cases/products"
import { UpdateProductController } from "@/presentation/controllers/products"

import { PrismaProductsRepository } from "@/infra/database/prisma/repositories"

export function makeUpdateProductController() {
    const productsRepository = new PrismaProductsRepository()

    const updateProductUseCase = new UpdateProductUseCase(productsRepository)
    return new UpdateProductController(updateProductUseCase)
}
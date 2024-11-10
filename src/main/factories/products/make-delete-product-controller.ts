import { DeleteProductUseCase } from "@/application/use-cases/products"
import { DeleteProductController } from "@/presentation/controllers/products"

import { PrismaProductsRepository } from "@/infra/database/prisma/repositories"

export function makeDeleteProductController() {
    const productsRepository = new PrismaProductsRepository()

    const deleteProductUseCase = new DeleteProductUseCase(productsRepository)
    return new DeleteProductController(deleteProductUseCase)
}
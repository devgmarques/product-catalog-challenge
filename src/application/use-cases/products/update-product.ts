import { ProductsRepository } from "@/application/protocols/database/products-repository"
import { IUpdateProductUseCase } from "@/domain/use-cases/products"

import { NotExistError, PriceLessThanZero } from "@/application/errors/errors"

export class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor (
    private productsRepository: ProductsRepository,
  ) {}

  async execute(input: IUpdateProductUseCase.Input): IUpdateProductUseCase.Output {
    const productExists = 
      await this.productsRepository.findById({ productId: input.productId })

    if(!productExists) {
      throw new NotExistError("Product")
    }

    if(!Number.isFinite(input.price) || input.price <= 0) {
      throw new PriceLessThanZero()
    }

    const transactionAssign = Object.assign(productExists, input)

    const product = await this.productsRepository.update({
      productId: transactionAssign.productId,
      name: transactionAssign.name,
      description: transactionAssign.description,
      price: transactionAssign.price,
      amountStock: transactionAssign.amountStock,
    })

    return product
  }
} 

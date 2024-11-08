import { ProductsRepository } from "@/application/protocols/database/products-repository"
import { ICreateProductUseCase } from "@/domain/use-cases/products"

import { PriceLessThanZero } from "@/application/errors/errors"

export class CreateProductUseCase implements ICreateProductUseCase {
  constructor (
    private productsRepository: ProductsRepository,
  ) {}

  async execute(input: ICreateProductUseCase.Input): ICreateProductUseCase.Output {
    if (!Number.isFinite(input.price) || input.price <= 0) {
      throw new PriceLessThanZero()
    }

    const product = await this.productsRepository.create({
      name: input.name,
      description: input.description,
      price: input.price,
      amountStock: input.amountStock,
    })

    return product
  }
} 

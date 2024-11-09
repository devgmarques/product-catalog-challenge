import { ProductsRepository } from "@/application/protocols/database/products-repository"

import { IFetchProductUseCase } from "@/domain/use-cases/products"

export class FetchProductUseCase implements IFetchProductUseCase {
  constructor (
    private productsRepository: ProductsRepository,
  ) {}

  async execute(): IFetchProductUseCase.Output {
    const products = await this.productsRepository.fetch()

    return products
  }
} 

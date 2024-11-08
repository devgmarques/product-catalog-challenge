import { NotExistError } from "@/application/errors/errors"
import { ProductsRepository } from "@/application/protocols/database/products-repository"

import { IDeleteProductUseCase } from "@/domain/use-cases/products"

export class DeleteProductUseCase implements IDeleteProductUseCase {
  constructor (
    private productsRepository: ProductsRepository,
  ) {}

  async execute(input: IDeleteProductUseCase.Input): IDeleteProductUseCase.Output {
    const productExists = 
      await this.productsRepository.findById({ productId: input.productId })

    if(!productExists) {
      throw new NotExistError("Product")
    }

    await this.productsRepository.delete({
      productId: input.productId
    })
  }
} 

import { Product } from "@/domain/entities"

export interface IUpdateProductUseCase {
  execute(input: IUpdateProductUseCase.Input): IUpdateProductUseCase.Output
}

export namespace IUpdateProductUseCase {
  export type Input = {
    productId: string
    name: string
    description: string
    price: number
    amountStock: number
  }

  export type Output = Promise<Product>
}
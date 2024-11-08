import { Product } from "@/domain/entities"

export interface ICreateProductUseCase {
  execute(input: ICreateProductUseCase.Input): ICreateProductUseCase.Output
}

export namespace ICreateProductUseCase {
  export type Input = {
    name: string
    description: string
    price: number
    amountStock: number
  }

  export type Output = Promise<Product>
}
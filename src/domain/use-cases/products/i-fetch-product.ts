import { Product } from "@/domain/entities"

export interface IFetchProductUseCase {
  execute(input: IFetchProductUseCase.Input): IFetchProductUseCase.Output
}

export namespace IFetchProductUseCase {
  export type Input = null 

  export type Output = Promise<Product[]>
}
import { Product } from "@/domain/entities"

export interface IFetchProductUseCase {
  execute(): IFetchProductUseCase.Output
}

export namespace IFetchProductUseCase {
  export type Output = Promise<Product[]>
}
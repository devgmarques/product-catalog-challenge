import { Catalog, Product } from "@/domain/entities"

export interface ICreateProductToCatalogUseCase {
  execute(input: ICreateProductToCatalogUseCase.Input): ICreateProductToCatalogUseCase.Output
}

export namespace ICreateProductToCatalogUseCase {
  export type Input = {
    catalogId: string
    userId: string
    productId: string
  }

  export type Output = Promise<Catalog>
}
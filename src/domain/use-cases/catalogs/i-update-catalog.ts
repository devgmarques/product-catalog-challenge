import { Catalog } from "@/domain/entities"

export interface IUpdateCatalogUseCase {
  execute(input: IUpdateCatalogUseCase.Input): IUpdateCatalogUseCase.Output
}

export namespace IUpdateCatalogUseCase {
  export type Input = {
    catalogId: string
    userId: string
    title: string
    description: string
  }

  export type Output = Promise<Catalog>
}
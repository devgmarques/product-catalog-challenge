import { Catalog } from "@/domain/entities"

export interface IFetchCatalogUseCase {
  execute(input: IFetchCatalogUseCase.Input): IFetchCatalogUseCase.Output
}

export namespace IFetchCatalogUseCase {
  export type Input = {
    userId: string
  }

  export type Output = Promise<Catalog[]>
}
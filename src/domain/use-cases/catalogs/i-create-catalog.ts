import { Catalog } from "@/domain/entities"

export interface ICreateCatalogUseCase {
  execute(input: ICreateCatalogUseCase.Input): ICreateCatalogUseCase.Output
}

export namespace ICreateCatalogUseCase {
  export type Input = {
    userId: string
    title: string
    description: string
  }

  export type Output = Promise<Catalog>
}
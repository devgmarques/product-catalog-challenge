export interface IDeleteCatalogUseCase {
  execute(input: IDeleteCatalogUseCase.Input): IDeleteCatalogUseCase.Output
}

export namespace IDeleteCatalogUseCase {
  export type Input = {
    catalogId: string
  }

  export type Output = Promise<void>
}
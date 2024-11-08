export interface IDeleteProductUseCase {
  execute(input: IDeleteProductUseCase.Input): IDeleteProductUseCase.Output
}

export namespace IDeleteProductUseCase {
  export type Input = {
    productId: string
  }

  export type Output = Promise<void>
}
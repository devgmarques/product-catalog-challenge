import { Product } from "@/domain/entities"

export type ProductsRepository = {
  create(input: ProductsRepository.Create.Input): ProductsRepository.Create.Output
  findById(input: ProductsRepository.FindById.Input): ProductsRepository.FindById.Output
  delete(input: ProductsRepository.Delete.Input): ProductsRepository.Delete.Output
  update(input: ProductsRepository.Update.Input): ProductsRepository.Update.Output
  fetch(input: ProductsRepository.Fetch.Input): ProductsRepository.Fetch.Output
}

export namespace ProductsRepository {
  export namespace Create {
    export type Input = {
      productId?: string
      name: string
      description: string
      price: number
      amountStock: number
    }

    export type Output = Promise<Product>
  }

  export namespace Update {
    export type Input = {
      productId: string
      name: string
      description: string
      price: number
      amountStock: number
    }

    export type Output = Promise<Product>
  }

  export namespace FindById {
    export type Input = {
      productId: string
    }

    export type Output = Promise<Product | null>
  }

  export namespace Delete {
    export type Input = {
      productId: string
    }

    export type Output = Promise<void>
  }

  export namespace Fetch {
    export type Input = null

    export type Output = Promise<Product[]>
  }
}
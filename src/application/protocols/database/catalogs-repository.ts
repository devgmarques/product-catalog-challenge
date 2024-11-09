import { Catalog, Product } from "@/domain/entities"

export type CatalogsRepository = {
  create(input: CatalogsRepository.Create.Input): CatalogsRepository.Create.Output
  createProductToCatalog(input: CatalogsRepository.CreateProductToCatalog.Input): CatalogsRepository.CreateProductToCatalog.Output
  findById(input: CatalogsRepository.FindById.Input): CatalogsRepository.FindById.Output
  update(input: CatalogsRepository.Update.Input): CatalogsRepository.Update.Output
  delete(input: CatalogsRepository.Delete.Input): CatalogsRepository.Delete.Output
  fetch(input: CatalogsRepository.Fetch.Input): CatalogsRepository.Fetch.Output
}

export namespace CatalogsRepository {
  export namespace Create {
    export type Input = {
      catalogId?: string
      userId: string
      title: string
      description: string
    }

    export type Output = Promise<Catalog>
  }

  export namespace CreateProductToCatalog {
    export type Input = {
      catalogId: string
      product: Product
    }

    export type Output = Promise<Catalog>
  }

  export namespace Update {
    export type Input = {
      catalogId: string
      userId: string
      title: string
      description: string
    }

    export type Output = Promise<Catalog>
  }

  export namespace FindById {
    export type Input = {
      userId: string,
      catalogId: string
    }

    export type Output = Promise<Catalog | null>
  }

  export namespace Delete {
    export type Input = {
      userId: string,
      catalogId: string
    }

    export type Output = Promise<void>
  }

  export namespace Fetch {
    export type Input = {
      userId: string
    }

    export type Output = Promise<Catalog[]>
  }
}
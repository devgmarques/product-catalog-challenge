import { CatalogsRepository } from "@/application/protocols/database"

import { Catalog } from "@/domain/entities"

export class InMemoryCatalogsRepository implements CatalogsRepository {
  private database: Catalog[] = []

  async create(input: CatalogsRepository.Create.Input): CatalogsRepository.Create.Output {
    const catalog: Catalog = {
      catalogId: input.catalogId ?? "catalogId-01",
      userId: input.userId,
      title: input.title,
      description: input.description,
      products: [],
      createdAt: new Date()
    }

    this.database.push(catalog)

    return catalog
  }

  async createProductToCatalog(input: CatalogsRepository.CreateProductToCatalog.Input): CatalogsRepository.CreateProductToCatalog.Output {
    const catalogIndex = this.database
      .findIndex(item => item.catalogId === input.catalogId)

    const catalog = this.database[catalogIndex]

    const updatedCatalog: Catalog = {
      ...catalog,
      products: [...catalog.products, input.product],
    }

    this.database[catalogIndex] = updatedCatalog

    return updatedCatalog
  }

  async update(input: CatalogsRepository.Update.Input): CatalogsRepository.Update.Output {
    const catalogIndex = this.database
      .findIndex(item => item.catalogId === input.catalogId && item.userId === input.userId)

    const catalog = this.database[catalogIndex]

    const updatedCatalog: Catalog = {
      catalogId: input.catalogId,
      title: input.title,
      description: input.description,
      userId: input.userId,
      products: [],
      createdAt: catalog.createdAt,
    }

    this.database[catalogIndex] = updatedCatalog
    return updatedCatalog
  }

  async findById(input: CatalogsRepository.FindById.Input): CatalogsRepository.FindById.Output {
    const catalog = 
      this.database.find((item) => item.userId === input.userId && item.catalogId === input.catalogId)

    if (!catalog) {
      return null
    }

    return catalog
  }

  async delete(input: CatalogsRepository.Delete.Input): CatalogsRepository.Delete.Output {
    const products = this.database.
      filter(item => item.catalogId !== input.catalogId && item.userId === input.userId)

    this.database = products
  }

  async fetch(input: CatalogsRepository.Fetch.Input): CatalogsRepository.Fetch.Output {
    const catalogs = this.database.filter(item => item.userId === input.userId)

    return catalogs
  }
}
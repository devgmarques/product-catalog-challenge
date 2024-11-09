import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { CatalogsRepository } from '@/application/protocols/database'

import { ICreateCatalogUseCase } from '@/domain/use-cases/catalogs'
import { InMemoryCatalogsRepository } from '@/infra/database/in-memory'

import { CreateCatalogUseCase } from './create-catalog'

let catalogsRepository: CatalogsRepository
let sut: ICreateCatalogUseCase

describe("create catalog use case", () => {
  beforeEach(() => {
    catalogsRepository = new InMemoryCatalogsRepository()

    sut = new CreateCatalogUseCase(catalogsRepository)
  })

  it("should be able to create catalog with successful", async () => {
    const catalog = await sut.execute({
      userId: "userId-01",
      description: "description",
      title: "title",
    })

    expect(catalog.catalogId).toBe("catalogId-01")
    expect(catalog.title).toBe("title")
    expect(catalog.description).toBe("description")
    expect(catalog.userId).toBe("userId-01")
    expect(catalog.products).toHaveLength(0)
    expect(catalog.createdAt).toBeDefined()
  })

  it("should be able to call catalogsRepository with correct values", async () => {
    const catalogsRepositorySpy = vitest.spyOn(catalogsRepository, "create")

    await sut.execute({
      userId: "userId-01",
      description: "description",
      title: "title",
    })
    
    expect(catalogsRepositorySpy).toHaveBeenCalledWith({
      userId: "userId-01",
      description: "description",
      title: "title",
    })
  })
})
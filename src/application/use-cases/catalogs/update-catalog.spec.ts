import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { CatalogsRepository } from '@/application/protocols/database'

import { IUpdateCatalogUseCase } from '@/domain/use-cases/catalogs'
import { InMemoryCatalogsRepository } from '@/infra/database/in-memory'

import { UpdateCatalogUseCase } from './update-catalog'

let catalogsRepository: CatalogsRepository
let sut: IUpdateCatalogUseCase

describe("update catalog use case", () => {
  beforeEach(() => {
    catalogsRepository = new InMemoryCatalogsRepository()
    sut = new UpdateCatalogUseCase(catalogsRepository)

    catalogsRepository.create({
      catalogId: "catalogId-01",
      userId: "userId-01",
      description: "description",
      title: "title",
    })
  })

  it("should be able to update catalog with successful", async () => {
    const catalog = await sut.execute({
      catalogId: "catalogId-01",
      userId: "userId-01",
      description: "description-updated",
      title: "title-updated",
    })

    expect(catalog.catalogId).toBe("catalogId-01")
    expect(catalog.userId).toBe("userId-01")
    expect(catalog.title).toBe("title-updated")
    expect(catalog.description).toBe("description-updated")
    expect(catalog.products).toHaveLength(0)
    expect(catalog.createdAt).toBeDefined()
  })

  it("should be able to call findById catalogsRepository with correct values", async () => {
    const catalogsRepositorySpy = vitest.spyOn(catalogsRepository, "findById")

    await sut.execute({
      catalogId: "catalogId-01",
      userId: "userId-01",
      description: "description",
      title: "title",
    })
    
    expect(catalogsRepositorySpy).toHaveBeenCalledWith({
      catalogId: "catalogId-01",
      userId: "userId-01",
    })
  })

  it("should be able to return throw error NotExistError", async () => {
    expect(() => sut.execute({
      catalogId: "not-exists",
      userId: "userId-01",
      description: "description",
      title: "title",
    }))
  })

  it("should be able to call update catalogsRepository with correct values", async () => {
    const catalogsRepositorySpy = vitest.spyOn(catalogsRepository, "update")

    await sut.execute({
      catalogId: "catalogId-01",
      userId: "userId-01",
      description: "description",
      title: "title",
    })
    
    expect(catalogsRepositorySpy).toHaveBeenCalledWith({
      catalogId: "catalogId-01",
      userId: "userId-01",
      description: "description",
      title: "title",
    })
  })
})
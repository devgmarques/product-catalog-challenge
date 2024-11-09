import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { CatalogsRepository } from '@/application/protocols/database'

import { IDeleteCatalogUseCase } from '@/domain/use-cases/catalogs'
import { InMemoryCatalogsRepository } from '@/infra/database/in-memory'

import { DeleteCatalogUseCase } from './delete-catalog'
import { NotExistError } from '@/application/errors/errors'

let catalogsRepository: CatalogsRepository
let sut: IDeleteCatalogUseCase

describe("delete catalog use case", () => {
  beforeEach(() => {
    catalogsRepository = new InMemoryCatalogsRepository()
    sut = new DeleteCatalogUseCase(catalogsRepository)

    catalogsRepository.create({
      catalogId: "catalogId-01",
      userId: "userId-01",
      description: "description",
      title: "title",
    })
  })

  it("should be able to delete catalog with successful", async () => {
    const catalog = await sut.execute({
      catalogId: "catalogId-01",
      userId: "userId-01",
    })

    expect(catalog).toBeUndefined()
  })

  it("should be able to call findById catalogsRepository with correct values", async () => {
    const catalogsRepositorySpy = vitest.spyOn(catalogsRepository, "findById")

    await sut.execute({
      catalogId: "catalogId-01",
      userId: "userId-01",
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
    })).rejects.toBeInstanceOf(NotExistError)
  })

  it("should be able to call delete catalogsRepository with correct values", async () => {
    const catalogsRepositorySpy = vitest.spyOn(catalogsRepository, "delete")

    await sut.execute({
      catalogId: "catalogId-01",
      userId: "userId-01",
    })
    
    expect(catalogsRepositorySpy).toHaveBeenCalledWith({
      catalogId: "catalogId-01",
      userId: "userId-01",
    })
  })
})
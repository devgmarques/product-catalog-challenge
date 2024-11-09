import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { CatalogsRepository } from '@/application/protocols/database'

import { IFetchCatalogUseCase } from '@/domain/use-cases/catalogs'
import { InMemoryCatalogsRepository } from '@/infra/database/in-memory'

import { FetchCatalogUseCase } from './fetch-catalog'

let catalogsRepository: CatalogsRepository
let sut: IFetchCatalogUseCase

describe("fetch catalog use case", () => {
  beforeEach(() => {
    catalogsRepository = new InMemoryCatalogsRepository()

    sut = new FetchCatalogUseCase(catalogsRepository)

    for(let i = 0; i < 10; i++) {
      catalogsRepository.create({
        catalogId: `catalogId-0${i}`,
        userId: "userId-01",
        description: "description",
        title: "title",
      })
    }
  })

  it("should be able to fetch catalog with successful", async () => {
    const catalog = await sut.execute({
      userId: "userId-01"
    })

    expect(catalog).toHaveLength(10)
  })

  it("should be able to call catalogsRepository with correct values", async () => {
    const catalogsRepositorySpy = vitest.spyOn(catalogsRepository, "fetch")

    await sut.execute({
      userId: "userId-01",
    })
    
    expect(catalogsRepositorySpy).toHaveBeenCalledWith({
      userId: "userId-01"
    })
  })
})
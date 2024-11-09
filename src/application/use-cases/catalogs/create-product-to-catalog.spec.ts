import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { CatalogsRepository, ProductsRepository } from '@/application/protocols/database'

import { ICreateProductToCatalogUseCase } from '@/domain/use-cases/catalogs'
import { InMemoryCatalogsRepository, InMemoryProductsRepository } from '@/infra/database/in-memory'

import { CreateProductToCatalogUseCase } from './create-product-to-catalog'
import { NotExistError } from '@/application/errors/errors'
import { Product } from '@/domain/entities'

let catalogsRepository: CatalogsRepository
let productsRepository: ProductsRepository
let sut: ICreateProductToCatalogUseCase

describe("create product to catalog use case", () => {
  beforeEach(() => {
    catalogsRepository = new InMemoryCatalogsRepository()
    productsRepository = new InMemoryProductsRepository()
    sut = new CreateProductToCatalogUseCase(catalogsRepository, productsRepository)

    productsRepository.create({
      productId: "productId-01",
      name: "name",
      amountStock: 1,
      description: "description",
      price: 1000,
    })
    
    catalogsRepository.create({
      catalogId: "catalogId-01",
      userId: "userId-01",
      description: "description",
      title: "title",
    })
  })

  it("should be able to create product to catalog with successful", async () => {
    const product: Product = {
      productId: "productId-01",
      name: "name",
      amountStock: 1,
      description: "description",
      price: 1000,
      catalogs: [],
      createdAt: new Date()
    }

    const catalog = await sut.execute({
      catalogId: "catalogId-01",
      userId: "userId-01",
      product
    })

    expect(catalog.catalogId).toBe("catalogId-01")
    expect(catalog.userId).toBe("userId-01")
    expect(catalog.title).toBe("title")
    expect(catalog.description).toBe("description")
    expect(catalog.products).toHaveLength(1)
    expect(catalog.createdAt).toBeDefined()
  })

  it("should be able to call findById catalogsRepository with correct values", async () => {
    const catalogsRepositorySpy = vitest.spyOn(catalogsRepository, "findById")

    const product: Product = {
      productId: "productId-01",
      name: "name",
      amountStock: 1,
      description: "description",
      price: 1000,
      catalogs: [],
      createdAt: new Date()
    }

    await sut.execute({
      catalogId: "catalogId-01",
      userId: "userId-01",
      product
    })
    
    expect(catalogsRepositorySpy).toHaveBeenCalledWith({
      catalogId: "catalogId-01",
      userId: "userId-01",
    })
  })

  it("should be able to return throw error NotExistError catalog", async () => {
    const product: Product = {
      productId: "productId-01",
      name: "name",
      amountStock: 1,
      description: "description",
      price: 1000,
      catalogs: [],
      createdAt: new Date()
    }

    expect(() => sut.execute({
      catalogId: "not-exists-id",
      userId: "userId-01",
      product
    })).rejects.toBeInstanceOf(NotExistError)
  })

  it("should be able to call findById productsRepository with correct values", async () => {
    const catalogsRepositorySpy = vitest.spyOn(productsRepository, "findById")

    const product: Product = {
      productId: "productId-01",
      name: "name",
      amountStock: 1,
      description: "description",
      price: 1000,
      catalogs: [],
      createdAt: new Date()
    }

    await sut.execute({
      catalogId: "catalogId-01",
      userId: "userId-01",
      product
    })
    
    expect(catalogsRepositorySpy).toHaveBeenCalledWith({
      productId: "productId-01",
    })
  })

  it("should be able to return throw error NotExistError product", async () => {
    const product: Product = {
      productId: "not-exists-id",
      name: "name",
      amountStock: 1,
      description: "description",
      price: 1000,
      catalogs: [],
      createdAt: new Date()
    }

    expect(() => sut.execute({
      catalogId: "catalogId-01",
      userId: "userId-01",
      product
    })).rejects.toBeInstanceOf(NotExistError)
  })

  it("should be able to call createProductToCatalog catalogsRepository with correct values", async () => {
    const catalogsRepositorySpy = vitest.spyOn(catalogsRepository, "createProductToCatalog")

    const product: Product = {
      productId: "productId-01",
      name: "name",
      amountStock: 1,
      description: "description",
      price: 1000,
      catalogs: [],
      createdAt: new Date()
    }

    await sut.execute({
      catalogId: "catalogId-01",
      userId: "userId-01",
      product
    })
    
    expect(catalogsRepositorySpy).toHaveBeenCalledWith({
      catalogId: "catalogId-01",
      product
    })
  })
})
import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { ProductsRepository } from '@/application/protocols/database/products-repository'
import { IUpdateProductUseCase } from '@/domain/use-cases/products'

import { InMemoryProductsRepository } from '@/infra/database/in-memory'
import { NotExistError, PriceLessThanZero } from '@/application/errors/errors'
import { UpdateProductUseCase } from './update-product'

let productsRepository: ProductsRepository
let sut: IUpdateProductUseCase

describe("update product use case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()

    sut = new UpdateProductUseCase(productsRepository)

    productsRepository.create({
      productId: "productId-01",
      name: "name",
      description: "description",
      amountStock: 1,
      price: 100
    })
  })

  it("should be able to update product with successful", async () => {
    const product = await sut.execute({
      productId: "productId-01",
      name: "name-updated",
      amountStock: 0,
      description: "description-updated",
      price: 120
    })

    expect(product.productId).toBe("productId-01")
    expect(product.name).toBe("name-updated")
    expect(product.description).toBe("description-updated")
    expect(product.catalogs).toHaveLength(0)
    expect(product.amountStock).toBe(0)
    expect(product.price).toBe(120)
    expect(product.createdAt).toBeDefined()
  })

  it("should be able to call findById productsRepository with correct values", async () => {
    const productsRepositorySpy = vitest.spyOn(productsRepository, "findById")

    await sut.execute({
      productId: "productId-01",
      name: "name-updated",
      amountStock: 0,
      description: "description-updated",
      price: 120
    })
    
    expect(productsRepositorySpy).toHaveBeenCalledWith({
      productId: "productId-01",
    })
  })

  it("should be able to call error NotExistError", async () => {
    expect(() => sut.execute({
      productId: "not-exists-id",
      name: "name-updated",
      amountStock: 0,
      description: "description-updated",
      price: 0
    })).rejects.toBeInstanceOf(NotExistError)
  })

  it("should be able to call error PriceLessThanZero", async () => {
    expect(() => sut.execute({
      productId: "productId-01",
      name: "name-updated",
      amountStock: 0,
      description: "description-updated",
      price: 0
    })).rejects.toBeInstanceOf(PriceLessThanZero)
  })

  it("should be able to call update productsRepository with correct values", async () => {
    const productsRepositorySpy = vitest.spyOn(productsRepository, "update")

    await sut.execute({
      productId: "productId-01",
      name: "name-updated",
      amountStock: 0,
      description: "description-updated",
      price: 120
    })
    
    expect(productsRepositorySpy).toHaveBeenCalledWith({
      productId: "productId-01",
      name: "name-updated",
      amountStock: 0,
      description: "description-updated",
      price: 120
    })
  })
})
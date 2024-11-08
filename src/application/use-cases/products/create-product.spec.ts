import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { ProductsRepository } from '@/application/protocols/database/products-repository'
import { ICreateProductUseCase } from '@/domain/use-cases/products'

import { InMemoryProductsRepository } from '@/infra/database/in-memory'
import { CreateProductUseCase } from './create-product'
import { PriceLessThanZero } from '@/application/errors/errors'

let productsRepository: ProductsRepository
let sut: ICreateProductUseCase

describe("create product use case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()

    sut = new CreateProductUseCase(productsRepository)
  })

  it("should be able to create product with successful", async () => {
    const product = await sut.execute({
      name: "name",
      amountStock: 1,
      description: "description",
      price: 1000
    })

    expect(product.productId).toBe("productId-01")
    expect(product.name).toBe("name")
    expect(product.description).toBe("description")
    expect(product.catalogs).toHaveLength(0)
    expect(product.amountStock).toBe(1)
    expect(product.price).toBe(1000)
    expect(product.createdAt).toBeDefined()
  })

  it("should be able to call error PriceLessThanZero when the price is less than or equal to zero", async () => {
    expect(() => sut.execute({
      name: "name",
      amountStock: 1,
      description: "description",
      price: 0
    })).rejects.toBeInstanceOf(PriceLessThanZero)
  })

  it("should be able to call productsRepository with correct values", async () => {
    const productsRepositorySpy = vitest.spyOn(productsRepository, "create")

    await sut.execute({
      name: "name",
      amountStock: 1,
      description: "description",
      price: 1000
    })
    
    expect(productsRepositorySpy).toHaveBeenCalledWith({
      name: "name",
      amountStock: 1,
      description: "description",
      price: 1000
    })
  })
})
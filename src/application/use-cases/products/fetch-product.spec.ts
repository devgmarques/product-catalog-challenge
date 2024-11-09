import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { ProductsRepository } from '@/application/protocols/database'
import { IFetchProductUseCase } from '@/domain/use-cases/products'

import { InMemoryProductsRepository } from '@/infra/database/in-memory'

import { FetchProductUseCase } from './fetch-product'

let productsRepository: ProductsRepository
let sut: IFetchProductUseCase

describe("fetch product use case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()

    sut = new FetchProductUseCase(productsRepository)

    for(let i = 0; i < 10; i++) {
      productsRepository.create({
        productId: `productId-0${i}`,
        name: "name",
        description: "description",
        amountStock: 1,
        price: 10 * i
      })
    }
  })

  it("should be able to fetch products with successful", async () => {
    const products = await sut.execute()

    expect(products).toHaveLength(10)
  })

  it("should be able to call fetch productsRepository with correct values", async () => {
    const productsRepositorySpy = vitest.spyOn(productsRepository, "fetch")

    await sut.execute()
    
    expect(productsRepositorySpy).toHaveBeenCalledWith()
  })
})
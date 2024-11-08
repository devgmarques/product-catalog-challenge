import { beforeEach, describe, expect, it, vitest } from 'vitest'

import { ProductsRepository } from '@/application/protocols/database/products-repository'
import { IDeleteProductUseCase } from '@/domain/use-cases/products'

import { InMemoryProductsRepository } from '@/infra/database/in-memory'
import { NotExistError } from '@/application/errors/errors'

import { DeleteProductUseCase } from './delete-product'

let productsRepository: ProductsRepository
let sut: IDeleteProductUseCase

describe("delete product use case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()

    sut = new DeleteProductUseCase(productsRepository)

    productsRepository.create({
      productId: "productId-01",
      name: "name",
      description: "description",
      amountStock: 1,
      price: 100
    })
  })

  it("should be able to delete product with successful", async () => {
    const product = await sut.execute({
      productId: "productId-01"
    })

    expect(product).toBeUndefined()
  })

  it("should be able to call findById productsRepository with correct values", async () => {
    const productsRepositorySpy = vitest.spyOn(productsRepository, "findById")

    await sut.execute({
      productId: "productId-01",
    })
    
    expect(productsRepositorySpy).toHaveBeenCalledWith({
      productId: "productId-01",
    })
  })

  it("should be able to call error NotExistError", async () => {
    expect(() => sut.execute({
      productId: "not-exists-id",
    })).rejects.toBeInstanceOf(NotExistError)
  })

  it("should be able to call delete productsRepository with correct values", async () => {
    const productsRepositorySpy = vitest.spyOn(productsRepository, "delete")

    await sut.execute({
      productId: "productId-01",
    })
    
    expect(productsRepositorySpy).toHaveBeenCalledWith({
      productId: "productId-01",
    })
  })
})
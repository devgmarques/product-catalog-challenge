import { ProductsRepository } from "@/application/protocols/database/products-repository"

import { Product } from "@/domain/entities"

export class InMemoryProductsRepository implements ProductsRepository {
  private database: Product[] = []

  async create(input: ProductsRepository.Create.Input): ProductsRepository.Create.Output {
    const product: Product = {
      productId: input.productId ?? "productId-01",
      name: input.name,
      description: input.description,
      price: input.price,
      amountStock: input.amountStock,
      catalogs: [],
      createdAt: new Date(),
    }

    this.database.push(product)

    return product
  }

  async update(input: ProductsRepository.Update.Input): ProductsRepository.Update.Output {
    const productIndex = this.database
      .findIndex(item => item.productId === input.productId)

    const product = this.database[productIndex]

    const updatedProduct: Product = {
      productId: input.productId,
      name: input.name,
      description: input.description,
      price: input.price,
      amountStock: input.amountStock,
      catalogs: [],
      createdAt: product.createdAt,
    }

    this.database[productIndex] = updatedProduct
    return updatedProduct
  }

  async delete(input: ProductsRepository.Delete.Input): ProductsRepository.Delete.Output {
    const products = this.database.
      filter(item => item.productId !== input.productId)

    this.database = products
  }

  async fetch(): ProductsRepository.Fetch.Output {
    const products = this.database

    return products
  }

  async findById(input: ProductsRepository.FindById.Input): ProductsRepository.FindById.Output {
    const product = this.database
      .find(item => item.productId === input.productId)

    if(!product) {
      return null
    }

    return product
  }
}
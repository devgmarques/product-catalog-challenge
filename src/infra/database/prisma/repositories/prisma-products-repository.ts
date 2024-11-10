import { Catalog, Product } from "@/domain/entities"
import { ProductsRepository } from "@/application/protocols/database"

import { prisma } from ".."

export class PrismaProductsRepository implements ProductsRepository {
  async create(input: ProductsRepository.Create.Input): ProductsRepository.Create.Output {
    const product = await prisma.product.create({
      data: {
        name: input.name,
        description: input.description,
        price: input.price,
        amountStock: input.amountStock,
      }
    })

    return {
      ...product,
      catalogs: []
    }
  }

  async update(input: ProductsRepository.Update.Input): ProductsRepository.Update.Output {
    const product = await prisma.product.update({
      where: {
        productId: input.productId
      },
      data: {
        name: input.name,
        description: input.description,
        price: input.price,
        amountStock: input.amountStock
      },
      include: {
        catalogs: true 
      }
    })

    return this.mapToProduct(product)
  }

  async findById(input: ProductsRepository.FindById.Input): ProductsRepository.FindById.Output {
    const product = await prisma.product.findFirst({
      where: {
        productId: input.productId
      },
      include: {
        catalogs: true 
      }
    })

    return product ? this.mapToProduct(product) : null
  }

  async delete(input: ProductsRepository.Delete.Input): ProductsRepository.Delete.Output {
    await prisma.product.delete({
      where: {
        productId: input.productId
      }
    })
  }

  async fetch(): ProductsRepository.Fetch.Output {
    const products = await prisma.product.findMany({
      include: {
        catalogs: true 
      }
    })

    return products.map(this.mapToProduct)
  }

  private mapToProduct(product: any): Product {
    return {
      productId: product.productId,
      name: product.name,
      description: product.description,
      price: product.price,
      amountStock: product.amountStock,

      catalogs: product.catalogs.map((catalog: Catalog) => ({
        catalogId: catalog.catalogId.toString(),
        userId: catalog.userId.toString(),
        title: catalog.title,
        description: catalog.description,
        createdAt: catalog.createdAt,

        products: catalog.products.map((product: Product) => ({
          productId: product.productId.toString(),
          name: product.name,
          description: product.description,
          price: product.price,
          amountStock: product.amountStock,
          createdAt: product.createdAt,
          catalogs: [],
        })),
      })),
      createdAt: product.createdAt
    }
  }
}

import { Catalog, Product } from "@/domain/entities"
import { CatalogsRepository } from "@/application/protocols/database"
import { prisma } from ".."

export class PrismaCatalogsRepository implements CatalogsRepository {
  async create(input: CatalogsRepository.Create.Input): CatalogsRepository.Create.Output {
    const catalog = await prisma.catalog.create({
      data: {
        title: input.title,
        description: input.description,
        user: { connect: { userId: input.userId } },
      }
    })

    return {
      ...catalog,
      products: []
    }
  }

  async createProductToCatalog(input: CatalogsRepository.CreateProductToCatalog.Input): CatalogsRepository.CreateProductToCatalog.Output {
    const updatedCatalog = await prisma.catalog.update({
      where: { catalogId: input.catalogId },
      data: {
        products: {
          connect: {
            productId: input.product.productId
          }
        }
      }
    })

    return this.mapToCatalog(updatedCatalog)
  }

  async findById(input: CatalogsRepository.FindById.Input): CatalogsRepository.FindById.Output {
    const catalog = await prisma.catalog.findFirst({
      where: {
        userId: input.userId,
        catalogId: input.catalogId
      },
      include: {
        products: true,
      }
    })

    return catalog ? this.mapToCatalog(catalog) : null
  }

  async update(input: CatalogsRepository.Update.Input): CatalogsRepository.Update.Output {
    const updatedCatalog = await prisma.catalog.update({
      where: { catalogId: input.catalogId },
      data: {
        title: input.title,
        description: input.description,
      }
    })

    return this.mapToCatalog(updatedCatalog)
  }

  async delete(input: CatalogsRepository.Delete.Input): CatalogsRepository.Delete.Output {
    await prisma.catalog.delete({
      where: {
        catalogId: input.catalogId
      }
    })
  }

  async fetch(input: CatalogsRepository.Fetch.Input): CatalogsRepository.Fetch.Output {
    const catalogs = await prisma.catalog.findMany({
      where: {
        userId: input.userId
      },
      include: {
        products: true  
      }
    })

    return catalogs.map(this.mapToCatalog)
  }

  private mapToCatalog(catalog: any): Catalog {
    return {
      catalogId: catalog.catalogId,
      userId: catalog.userId,
      title: catalog.title,
      description: catalog.description,
      products: catalog.products,  // Relacionamento de produtos
      createdAt: catalog.createdAt,
    }
  }
}

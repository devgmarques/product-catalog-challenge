import { Catalog, Product, User } from "@/domain/entities"

import { UsersRepository } from "@/application/protocols/database"
import { prisma } from ".."

export class PrismaUsersRepository implements UsersRepository {
  async create(input: UsersRepository.Create.Input): UsersRepository.Create.Output {
    const user = await prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        password: input.password,
      },
      include: {
        catalogs: {
          include: {
            products: true,
          },
        },
      },
    })

    return this.mapToUser(user)
  }

  async findByEmail(input: UsersRepository.FindByEmail.Input): UsersRepository.FindByEmail.Output {
    const user = await prisma.user.findFirst({
      where: {
        email: input.email,
      },
      include: {
        catalogs: {
          include: {
            products: true,
          },
        },
      },
    })

    return user ? this.mapToUser(user) : null
  }

  async findById(input: UsersRepository.FindById.Input): UsersRepository.FindById.Output {
    const user = await prisma.user.findFirst({
      where: {
        userId: input.userId,
      },
      include: {
        catalogs: {
          include: {
            products: true,
          },
        },
      },
    })

    return user ? this.mapToUser(user) : null
  }

  private mapToUser(user: any): User {
    return {
      userId: user.userId.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,

      catalogs: user.catalogs.map((catalog: Catalog) => ({
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
    }
  }
}

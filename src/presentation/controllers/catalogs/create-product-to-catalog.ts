import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { ICreateProductToCatalogUseCase } from "@/domain/use-cases/catalogs"
import { NotExistError } from "@/application/errors/errors"

export class CreateProductToCatalogController {
  constructor(private readonly createProductToCatalogUseCase: ICreateProductToCatalogUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const createProductToCatalogParams = z.object({
        catalogId: z.string(),
        productId: z.string()
      })

      const {
        catalogId,
        productId
      } = createProductToCatalogParams.parse(request.params)

      const result = await this.createProductToCatalogUseCase.execute({
        catalogId,
        userId: request.user.sub,
        productId
      })

      return response.status(201).send({ catalog: result })
    } catch (error: any) {
      if (error instanceof NotExistError) {
        return response.status(404).send({ message: error.message })
      }

      throw error
    }
  }
}
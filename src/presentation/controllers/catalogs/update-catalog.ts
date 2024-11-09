import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { IUpdateCatalogUseCase } from "@/domain/use-cases/catalogs"
import { NotExistError } from "@/application/errors/errors"

export class UpdateCatalogController {
  constructor(private readonly updateCatalogUseCase: IUpdateCatalogUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const updateCatalogBody = z.object({
        title: z.string(),
        description: z.string(),
      })

      const updateCatalogParams = z.object({
        catalogId: z.string(),
      })

      const {
        title,
        description,
      } = updateCatalogBody.parse(request.body)
      const {
        catalogId
      } = updateCatalogParams.parse(request.body)

      const result = await this.updateCatalogUseCase.execute({
        catalogId,
        userId: request.user.sub,
        title,
        description,
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
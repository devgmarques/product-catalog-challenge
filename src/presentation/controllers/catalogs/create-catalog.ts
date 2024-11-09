import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { ICreateCatalogUseCase } from "@/domain/use-cases/catalogs"

export class CreateCatalogController {
  constructor(private readonly createCatalogUseCase: ICreateCatalogUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const createCatalogBody = z.object({
        title: z.string(),
        description: z.string(),
      })

      const {
        title,
        description,
      } = createCatalogBody.parse(request.body)

      const result = await this.createCatalogUseCase.execute({
        userId: request.user.sub,
        title,
        description,
      })

      return response.status(201).send({ catalog: result })
    } catch (error: any) {
      throw error
    }
  }
}
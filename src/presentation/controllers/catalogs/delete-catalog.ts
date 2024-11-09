import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { IDeleteCatalogUseCase } from "@/domain/use-cases/catalogs"
import { NotExistError } from "@/application/errors/errors"

export class DeleteCatalogController {
  constructor(private readonly deleteCatalogUseCase: IDeleteCatalogUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const deleteCatalogParams = z.object({
        catalogId: z.string()
      })

      const {
        catalogId
      } = deleteCatalogParams.parse(request.params)

      await this.deleteCatalogUseCase.execute({
        catalogId,
        userId: request.user.sub
      })

      return response.status(204).send()
    } catch (error: any) {
      if (error instanceof NotExistError) {
        return response.status(404).send({ message: error.message })
      }

      throw error
    }
  }
}
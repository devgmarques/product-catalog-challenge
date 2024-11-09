import { FastifyReply, FastifyRequest } from "fastify"

import { IFetchCatalogUseCase } from "@/domain/use-cases/catalogs"

export class FetchCatalogController {
  constructor(private readonly fetchCatalogUseCase: IFetchCatalogUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const result = await this.fetchCatalogUseCase.execute({
        userId: request.user.sub
      })

      return response.status(200).send({ catalogs: result })
    } catch (error: any) {
      throw error
    }
  }
}
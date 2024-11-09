import { FastifyReply, FastifyRequest } from "fastify"

import { IFetchProductUseCase } from "@/domain/use-cases/products"

export class FetchProductController {
  constructor(private readonly fetchProductUseCase: IFetchProductUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const result = await this.fetchProductUseCase.execute()

      return response.status(200).send({ products: result })
    } catch (error: any) {
      throw error
    }
  }
}
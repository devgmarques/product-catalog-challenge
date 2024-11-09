import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { IDeleteProductUseCase } from "@/domain/use-cases/products"
import { NotExistError } from "@/application/errors/errors"

export class DeleteProductController {
  constructor(private readonly deleteProductUseCase: IDeleteProductUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const deleteProductParams = z.object({
        productId: z.string()
      })

      const {
        productId
      } = deleteProductParams.parse(request.params)

      await this.deleteProductUseCase.execute({
        productId,
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
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { IUpdateProductUseCase } from "@/domain/use-cases/products"
import { NotExistError, PriceLessThanZero } from "@/application/errors/errors"

export class UpdateProductController {
  constructor(private readonly updateProductUseCase: IUpdateProductUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const updateProductBody = z.object({
        name: z.string(),
        description: z.string(),
        amountStock: z.coerce.number(),
        price: z.coerce.number(),
      })

      const updateProductParams = z.object({
        productId: z.string()
      })

      const {
        name,
        description,
        amountStock,
        price
      } = updateProductBody.parse(request.body)
      const {
        productId
      } = updateProductParams.parse(request.params)

      const result = await this.updateProductUseCase.execute({
        productId,
        name,
        description,
        amountStock,
        price
      })

      return response.status(201).send({ product: result })
    } catch (error: any) {
      if (error instanceof NotExistError) {
        return response.status(404).send({ message: error.message })
      }
      if (error instanceof PriceLessThanZero) {
        return response.status(400).send({ message: error.message })
      }

      throw error
    }
  }
}
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { ICreateProductUseCase } from "@/domain/use-cases/products"
import { PriceLessThanZero } from "@/application/errors/errors"

export class CreateProductController {
  constructor(private readonly createProductUseCase: ICreateProductUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const createProductBody = z.object({
        name: z.string(),
        description: z.string(),
        amountStock: z.coerce.number(),
        price: z.coerce.number(),
      })

      const {
        name,
        description,
        amountStock,
        price
      } = createProductBody.parse(request.body)

      const result = await this.createProductUseCase.execute({
        name,
        description,
        amountStock,
        price
      })

      return response.status(201).send({ product: result })
    } catch (error: any) {
      if (error instanceof PriceLessThanZero) {
        return response.status(400).send({ message: error.message })
      }

      throw error
    }
  }
}
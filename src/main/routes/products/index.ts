import { FastifyInstance } from "fastify"

import { 
  makeCreateProductController,
  makeDeleteProductController,
  makeFetchProductController,
  makeUpdateProductController
} from '@/main/factories/products'

import { verifyJwt } from "@/main/middlewares"

export async function routesProducts(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt)

  app.post("/products", (req, res) => makeCreateProductController().handle(req, res))
  app.get("/products", (req, res) => makeFetchProductController().handle(req, res))
  app.put("/products/:productId", (req, res) => makeUpdateProductController().handle(req, res))
  app.delete("/products/:productId", (req, res) => makeDeleteProductController().handle(req, res))
}
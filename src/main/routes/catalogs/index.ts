import { FastifyInstance } from "fastify"

import {
  makeCreateCatalogController,
  makeCreateProductToCatalogController,
  makeDeleteCatalogController,
  makeFetchCatalogController,
  makeUpdateCatalogController
} from '@/main/factories/catalogs'

export async function routesCatalogs(app: FastifyInstance) {
  app.post("/catalogs", (req, res) => makeCreateCatalogController().handle(req, res))
  app.post("/catalogs/:catalogId/:productId", (req, res) => makeCreateProductToCatalogController().handle(req, res))

  app.get("/catalogs", (req, res) => makeFetchCatalogController().handle(req, res))

  app.put("/catalogs/:catalogId", (req, res) => makeUpdateCatalogController().handle(req, res))
  app.delete("/catalogs/:catalogId", (req, res) => makeDeleteCatalogController().handle(req, res))
}
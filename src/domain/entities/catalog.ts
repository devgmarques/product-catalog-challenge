import { Product } from "./product"

export type Catalog = {
  catalogId: string
  title: string
  products: Product[]
  createdAt: Date
}
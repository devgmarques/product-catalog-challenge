import { Product } from "./product"

export type Catalog = {
  catalogId: string
  userId: string
  title: string
  description: string
  products: Product[]
  createdAt: Date
}
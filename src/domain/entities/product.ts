import { Catalog } from "./catalog"

export type Product = {
  productId: string
  name: string
  description: string
  price: number
  amountStock: number
  catalogs: Catalog[]
  createdAt: Date
}
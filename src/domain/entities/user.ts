import { Catalog } from "./catalog"

export type User = {
  userId: string
  name: string
  email: string
  password: string
  catalogs: Catalog[]
  createdAt: Date
}
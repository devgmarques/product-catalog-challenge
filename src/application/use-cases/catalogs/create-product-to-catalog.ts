import { NotExistError } from "@/application/errors/errors"
import { CatalogsRepository, ProductsRepository } from "@/application/protocols/database"
import { ICreateProductToCatalogUseCase } from "@/domain/use-cases/catalogs"

export class CreateProductToCatalogUseCase implements ICreateProductToCatalogUseCase {
  constructor (
    private catalogsRepository: CatalogsRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute(input: ICreateProductToCatalogUseCase.Input): ICreateProductToCatalogUseCase.Output {
    const catalogExists = await this.catalogsRepository.findById({
      catalogId: input.catalogId,
      userId: input.userId
    })
    
    if(!catalogExists) {
      throw new NotExistError("Catalog")
    } 

    const productExist = await this.productsRepository.findById({
      productId: input.product.productId
    })

    if(!productExist) {
      throw new NotExistError("Product")
    } 

    const catalog = await this.catalogsRepository.createProductToCatalog({
      catalogId: input.catalogId,
      product: {
        productId: input.product.productId,
        name: input.product.name,
        description: input.product.description,
        amountStock: input.product.amountStock,
        catalogs: input.product.catalogs,
        price: input.product.price,
        createdAt: input.product.createdAt,
      }
    })

    return catalog
  }
} 

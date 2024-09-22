import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateProductDto } from './dtos/createProducts.dto';
import { ProductEntity } from './entities/product.entity';
import { PriceHistoryEntity } from './entities/priceHistory.entity';
import { EditPriceDto } from './dtos/editPrice.dto';

@Injectable()
export class ProductsService {
  constructor(
  @InjectRepository(ProductEntity)
   private productsRepo: Repository<ProductEntity>,
   @InjectRepository(PriceHistoryEntity)
   private priceHistoryRepo : Repository<PriceHistoryEntity>
  ) {}

  async createProduct(product:CreateProductDto) {
    console.log('this is the product: ',product)
    const productEntity = this.productsRepo.create(product)
    console.log('this is the productEntity: ', productEntity)
    const savedProduct = await this.productsRepo.save(productEntity)
    console.log('this is the saved product: ', savedProduct)
    const priceHistoryObject = {
      start_date : new Date(),
      end_date : null,
      price : savedProduct.price,
      product: savedProduct

    }
    const priceHistoryEntity = this.priceHistoryRepo.create(priceHistoryObject)
    
    await this.priceHistoryRepo.save(priceHistoryEntity);
    
    return savedProduct

  }
  async getProductById(productId:number){
    console.log('this is the productId: ', productId)
    const found = await this.productsRepo.find({where: { id : productId },});
    return found
  }
  async getProductsInfoByIds(productIds : number[]){
   console.log('getting here')
   const productsInfo = await this.productsRepo.find({
      where  : { id : In(productIds)}
    }) 
    console.log('this is the products info: ',productsInfo)
    return productsInfo  
  }
  
  async editProductPrice(editPriceDto: EditPriceDto) {
    const { productId, newPrice } = editPriceDto;
  
    // 1. Find the product
    const product = await this.productsRepo.findOne({ where: { id: productId } });
    if (!product) {
      throw new Error('Product not found');
    }
  
    // 2. Find the most recent price history entry for this product
    const latestPriceHistory = await this.priceHistoryRepo.findOne({
      where: { product, end_date: null },
      order: { start_date: 'DESC' } 
    });
  
    if (latestPriceHistory) {
      // 3. Set the end date of the previous price history (indicating it's no longer valid)
      latestPriceHistory.end_date = new Date();
      await this.priceHistoryRepo.save(latestPriceHistory);
    }
  
    // 4. Update the product's current price
    await this.productsRepo.update(productId, { price: newPrice });
  
    // 5. Create a new price history entry for the new price
    const newPriceHistory = this.priceHistoryRepo.create({
      start_date: new Date(),
      end_date: null,
      price: newPrice,
      product: product // or productId if you're passing only the ID
    });
  
    await this.priceHistoryRepo.save(newPriceHistory);
  
    return { message: 'Product price updated successfully', data: product };
  }
  async getPriceHistoryById(productId: number){
    const product = await this.productsRepo.find({where: {id : productId}})
     const history = await this.priceHistoryRepo.find({where : {product}})
     
     return history
  }
  
  
}
 
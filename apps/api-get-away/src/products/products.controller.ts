import { Controller,Inject,Post,Body, Param, Get,Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dtos/createProduct.dto';
import { EditPriceDto } from './dtos/EditPrice.dto';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('PRODUCTS_SERVICE')
     private clientProducts: ClientProxy,
    @Inject('ORDERS_SERVICE')
     private clientOrders: ClientProxy
    ) {}

  @Post('create')
  async createProduct(@Body() product:CreateProductDto) {
    const productId = await firstValueFrom(
      this.clientProducts.send({cmd : 'product_created'}, 
        {name: product.name, price:product.price, description:product.description})
    )
    console.log('this is the product id: ', productId)
    const productName = product.name
    return this.clientOrders.emit('product_created', {id : productId , name : productName})

  }
  @Get(':id')
  getProductById(@Param() productId: number){
    
    return this.clientProducts.send({cmd: 'product-by-id',},{ productId })
  }
  @Put('edit-price')
  editProductPrice(@Body() editPricDto: EditPriceDto){
    return this.clientProducts.emit('price-edited', editPricDto)
  }
  @Get('price-history/:id')
  async getPriceHistoryById(@Param() productId:number){
    const history = await firstValueFrom(this.clientProducts.send({cmd : 'get-price-history' },{productId}))
    console.log('this is the history', history)
    return history
  }
  
} 
import { Controller,Inject,Post,Body, Param, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './products/dtos/createProduct.dto';


@Controller('products')
export class ApiGetAwayController {
  constructor(
    @Inject('PRODUCTS_SERVICE')
     private clientProducts: ClientProxy,
    ) {}

  @Post('create')
  createProduct(@Body() product:CreateProductDto) {
    this.clientProducts.emit('product_created', product)
  }
  @Get(':id')
  getProductById(@Param() productId: number){
    console.log('the api getaway route was hit')
    return this.clientProducts.send({cmd: 'product-by-id',},{ productId })
  }
}
 
import { Product } from "../interfaces/product.interface"
export class CreateOrderDto{
    userId:number
    userName: string
    total: number
    order_date : Date
    products: Product[]

}
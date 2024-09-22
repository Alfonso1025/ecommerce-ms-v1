import { Product } from "./product.interface"

export class Order{
    userId:number
    userName: string
    total: number
    order_date : Date
    productIds: Product[]
}
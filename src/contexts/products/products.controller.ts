import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @LoggedInOnly()
  async getProducts() {
    const products = await this.productsService.getProducts();

    return products;
  }

  @Get(':productId')
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.getProduct(productId);
  }
}

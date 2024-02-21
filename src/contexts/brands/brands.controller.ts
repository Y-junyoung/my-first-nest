import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BrandsService } from './brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  async getBrands() {
    return await this.brandsService.getBrands();
  }

  @Get(':brandId')
  async getBrand(@Param('brandId', ParseIntPipe) brandId: number) {
    return await this.brandsService.getBrand(brandId);
  }
}

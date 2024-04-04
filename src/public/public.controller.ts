import { Controller, Get, Param } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
    constructor(private readonly publicService: PublicService) {}


    @Get('brands')
    async getBrands() {
      return (await this.publicService.getBrands()).map((item) => item.manufacturer);
    }

    @Get('product')
    getProducts() {
      return this.publicService.getProducts();
    }

    @Get('product/:id')
    async getProduct(@Param('id') id: number) {
      return (await this.publicService.getProduct(id))[0];
    }
}

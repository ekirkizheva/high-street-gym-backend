import { Controller, Get } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
    constructor(private readonly publicService: PublicService) {}

    // @Get('product/:id')
    // async getProduct(@Param('id') id: number) {
    //   return (await this.publicService.getProduct(id))[0];
    // }

    @Get('classes')
    async getClasses() {
      return (await this.publicService.getClasses());
    }

    @Get('trainers')
    async getTrainers() {
      return (await this.publicService.getTrainers());
    }

    @Get('timetable')
    async getTimetable() {
      return (await this.publicService.getTimetable());
    }
}

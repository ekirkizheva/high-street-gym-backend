import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from 'src/model/feature.entity';
import { Product } from 'src/model/product.entity';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Feature])],
  controllers: [PublicController],
  providers: [PublicService]
})
export class PublicModule {}

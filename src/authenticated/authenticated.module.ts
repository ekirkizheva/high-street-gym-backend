import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from 'src/model/feature.entity';
import { Product } from 'src/model/product.entity';
import { AuthenticatedController } from './authenticated.controller';
import { AuthenticatedService } from './authenticated.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Feature])],
  controllers: [AuthenticatedController],
  providers: [AuthenticatedService]
})
export class AuthenticatedModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChangeLog } from 'src/model/changelog.entity';
import { Feature } from 'src/model/feature.entity';
import { Product } from 'src/model/product.entity';
import { User } from 'src/model/user.entityt';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, Feature, ChangeLog])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}

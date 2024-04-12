import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChangeLog } from 'src/model/changelog.entity';
import { ClassType } from 'src/model/class-type.entity';
import { Feature } from 'src/model/feature.entity';
import { Product } from 'src/model/product.entity';
import { ScheduledClasses } from 'src/model/scheduled-classes.entity';
import { Trainer } from 'src/model/trainer.entity';
import { User } from 'src/model/user.entityt';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
@Module({
  imports: [TypeOrmModule.forFeature([User, Product, Feature, ChangeLog, ClassType, Trainer, ScheduledClasses])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}

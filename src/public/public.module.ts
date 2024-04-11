import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassType } from 'src/model/class-type.entity';
import { ScheduledClasses } from 'src/model/scheduled-classes.entity';
import { Trainer } from 'src/model/trainer.entity';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClassType, Trainer, ScheduledClasses])],
  controllers: [PublicController],
  providers: [PublicService]
})
export class PublicModule {}

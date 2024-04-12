import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/model/blog.entity';
import { ScheduledClasses } from 'src/model/scheduled-classes.entity';
import { ScheduledEvents } from 'src/model/scheduled-events.entity';
import { Trainer } from 'src/model/trainer.entity';
import { User } from 'src/model/user.entityt';
import { AuthenticatedController } from './authenticated.controller';
import { AuthenticatedService } from './authenticated.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Blog, Trainer, ScheduledClasses, ScheduledEvents])],
  controllers: [AuthenticatedController],
  providers: [AuthenticatedService]
})
export class AuthenticatedModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/model/blog.entity';
import { User } from 'src/model/user.entityt';
import { AuthenticatedController } from './authenticated.controller';
import { AuthenticatedService } from './authenticated.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Blog])],
  controllers: [AuthenticatedController],
  providers: [AuthenticatedService]
})
export class AuthenticatedModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { JWT_SECRET } from './admin/constants/jwt-secret';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticatedModule } from './authenticated/authenticated.module';
import { Blog } from './model/blog.entity';
import { ClassType } from './model/class-type.entity';
import { ScheduledClasses } from './model/scheduled-classes.entity';
import { ScheduledEvents } from './model/scheduled-events.entity';
import { Trainer } from './model/trainer.entity';
import { User } from './model/user.entityt';
import { PublicModule } from './public/public.module';

@Module({
  imports: [PublicModule, AuthenticatedModule, AdminModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Qwertyu123',
      database: 'high_street_gym',
      entities: [User, ClassType, Trainer, ScheduledClasses, ScheduledEvents, Blog],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, ClassType, Trainer, ScheduledClasses]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

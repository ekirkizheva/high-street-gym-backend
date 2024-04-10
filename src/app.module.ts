import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { JWT_SECRET } from './admin/constants/jwt-secret';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticatedModule } from './authenticated/authenticated.module';
import { ChangeLog } from './model/changelog.entity';
import { ClassType } from './model/class-type.entity';
import { Customer } from './model/customer.entity';
import { Feature } from './model/feature.entity';
import { OrderDetail } from './model/order-detail.entity';
import { Order } from './model/order.entity';
import { Product } from './model/product.entity';
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
      entities: [User, Product, Feature, ChangeLog, Customer, Order, OrderDetail, ClassType, Trainer, ScheduledClasses, ScheduledEvents],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, ClassType, Trainer, ScheduledClasses]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

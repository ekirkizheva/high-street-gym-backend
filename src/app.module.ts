import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { JWT_SECRET } from './admin/constants/jwt-secret';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChangeLog } from './model/changelog.entity';
import { Customer } from './model/customer.entity';
import { Feature } from './model/feature.entity';
import { OrderDetail } from './model/order-detail.entity';
import { Order } from './model/order.entity';
import { Product } from './model/product.entity';
import { User } from './model/user.entityt';
import { PublicModule } from './public/public.module';

@Module({
  imports: [PublicModule, AdminModule,
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
      database: 'the_mobile_hour',
      entities: [User, Product, Feature, ChangeLog, Customer, Order, OrderDetail],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

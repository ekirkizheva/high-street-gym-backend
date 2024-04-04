import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { User } from './model/user.entityt';


@Controller()
export class AppController {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly appService: AppService
  ) {}

  @Post('seed')
  async postSeedData() {
    const hashedPassword = await bcrypt.hash('admin', 10);
    await this.userRepository.insert({
      username: 'admin',
      user_password: hashedPassword,
      firstName: 'Admin',
      lastName: '',
      user_role: 'admin',
    });
    return 'Success';
  }

  @Post('singin')
  signIn(@Body() signInDto: Record<string, any>) {
     return this.appService.signIn(signInDto.username, signInDto.password);
  }

}

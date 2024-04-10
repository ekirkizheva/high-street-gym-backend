import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { ClassType } from './model/class-type.entity';
import { Trainer } from './model/trainer.entity';


@Controller()
export class AppController {

  constructor(
    @InjectRepository(ClassType)
    private classTypeRepository: Repository<ClassType>,
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
    private readonly appService: AppService
  ) {}

  @Post('seed')
  async postSeedData() {
    // const hashedPassword = await bcrypt.hash('admin', 10);
    // await this.userRepository.insert({
    //   username: 'admin',
    //   user_password: hashedPassword,
    //   firstName: 'Admin',
    //   lastName: '',
    //   user_role: 'admin',
    // });

    const classTypes = this.classTypeRepository.insert([
      { name: 'Yoga' },
      { name: 'Pilates' },
      { name: 'Abs' },
      { name: 'HIIT or high-intensity interval training' },
      { name: 'Indoor cycling' },
      { name: 'Boxing' },
      { name: 'Zumba' }
    ]);

    const trainers = this.trainerRepository.insert([ 
      { name: 'Joe Black' },
      { name: 'Andrew Short' },
      { name: 'Natalie Oldman' },
      { name: 'Laura Fernandes' },
      { name: 'John Hawkins' },
      { name: 'Jeremy Wu' },
    ])

    await Promise.all([classTypes, trainers]);

    return 'Success';
  }

  @Post('singin')
  signIn(@Body() signInDto: Record<string, any>) {
     return this.appService.signIn(signInDto.username, signInDto.password);
  }

}

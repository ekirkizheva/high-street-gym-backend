import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { ClassType } from './model/class-type.entity';
import { ScheduledClasses } from './model/scheduled-classes.entity';
import { Trainer } from './model/trainer.entity';
import { User } from './model/user.entityt';


@Controller()
export class AppController {

  constructor(
    @InjectRepository(ClassType)
    private classTypeRepository: Repository<ClassType>,
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
    @InjectRepository(ScheduledClasses)
    private scheduledEventsRepository: Repository<ScheduledClasses>,
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

    await this.classTypeRepository.insert([
      { name: 'Yoga' },
      { name: 'Pilates' },
      { name: 'Abs' },
      { name: 'HIIT or high-intensity interval training' },
      { name: 'Indoor cycling' },
      { name: 'Boxing' },
      { name: 'Zumba' }
    ]);

    await this.trainerRepository.insert([ 
      { name: 'Joe Black' },
      { name: 'Andrew Short' },
      { name: 'Natalie Oldman' },
      { name: 'Laura Fernandes' },
      { name: 'John Hawkins' },
      { name: 'Jeremy Wu' },
    ])

    const classes = await this.classTypeRepository.find();
    const trainers = await this.trainerRepository.find();

    // Fill out the rest ?!?!?
    await this.scheduledEventsRepository.insert([
      { weekday: 1, time: 540, duration: 45, level: 'Beginner', class: classes[0], trainer: trainers[0]},
      { weekday: 1, time: 600, duration: 45, level: 'Intermediate', class: classes[1], trainer: trainers[1] },
      { weekday: 1, time: 660, duration: 45, level: 'Advanced', class: classes[2], trainer: trainers[2] },
      { weekday: 1, time: 840, duration: 45, level: 'Intermediate', class: classes[3], trainer: trainers[3] },
      { weekday: 1, time: 900, duration: 30, level: 'Advanced', class: classes[4], trainer: trainers[4] },

      { weekday: 2, time: 540, duration: 45, level: 'Beginner', class: classes[5], trainer: trainers[5]},
      { weekday: 2, time: 600, duration: 45, level: 'Intermediate', class: classes[4], trainer: trainers[1] },
      { weekday: 2, time: 660, duration: 45, level: 'Advanced', class: classes[3], trainer: trainers[3] },
      { weekday: 2, time: 840, duration: 45, level: 'Intermediate', class: classes[1], trainer: trainers[2] },
    ]);

    return 'Success';
  }

  @Post('signin')
  signIn(@Body() signInDto: Record<string, any>) {
     return this.appService.signIn(signInDto.username, signInDto.password);
  }

  @Post('signup')
  async postUser(@Body() userDTO: User) {
    return await this.appService.postUser(userDTO);
  }

}

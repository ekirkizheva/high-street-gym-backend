import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/model/blog.entity';
import { ScheduledClasses } from 'src/model/scheduled-classes.entity';
import { ScheduledEvents } from 'src/model/scheduled-events.entity';
import { Trainer } from 'src/model/trainer.entity';
import { User } from 'src/model/user.entityt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticatedService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Blog)
        private blogRepository: Repository<Blog>,
        @InjectRepository(Trainer)
        private trainerClassesRepository: Repository<Trainer>,
        @InjectRepository(ScheduledClasses)
        private scheduledClassesRepository: Repository<ScheduledClasses>,
        @InjectRepository(ScheduledEvents)
        private scheduledEventsRepository: Repository<ScheduledEvents>,
    ){}

    getBlog() {
        return this.blogRepository.find({
            relations: ['user'],
            select: {
                id: true,
                date: true,
                message: true,
                user: {
                    firstName: true,
                    lastName: true,
                }
            },
            order: {
                id: 'DESC'
            }
        });
    }

    async postBlog(username: string, blog: Blog) {
        const user = (await this.userRepository.findBy({username}))[0];
        return this.blogRepository.insert({...blog, user});
    }

    async getAvailability(date: Date, time: number, username: string) {
        const dayOfWek = new Date(date).getDay() || 7;
        const trainers = await this.trainerClassesRepository.find();

        const user = (await this.userRepository.findBy({username}))[0];

        const eventExists = (await this.scheduledEventsRepository.find({
            where: {date: new Date(date), time, user},
            relations: ['user']
        }))[0]

        if (eventExists) {
            return []; // Prevetns double booking
        }

        const classes = (await this.scheduledClassesRepository.find({
            where: { weekday: dayOfWek, time },
            relations: ['trainer'],
            select: {
                duration: true,
                trainer: {
                    id: true
                }
            }
        })).map((elem) => elem.trainer.id);

        const events = (await this.scheduledEventsRepository.find({
            where: {date: new Date(date), time},
            relations: ['trainer'],
            select: {
                duration: true,
                trainer: {
                    id: true
                }
            }
        })).map((elem) => elem.trainer.id);

        const availableTrainers = trainers.filter((trainer) => !classes.includes(trainer.id) && ! events.includes(trainer.id));

        return availableTrainers;
    }

    async postBooking(date: Date, time: number, trainer: number, username: string) {
        const selectedTrainer = (await this.getAvailability(date, time, username)).filter((_trainer) => _trainer.id === trainer)[0];
        if (!selectedTrainer) {
            throw new ForbiddenException('This booking can no longer be made');
        }

        const user = (await this.userRepository.findBy({username}))[0];

        return await this.scheduledEventsRepository.insert({
            date: new Date(date),
            time: time,
            duration: 60, // Currently fixed duration
            trainer: selectedTrainer,
            user
        });
    }

}
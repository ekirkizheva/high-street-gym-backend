import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassType } from 'src/model/class-type.entity';
import { ScheduledClasses } from 'src/model/scheduled-classes.entity';
import { Trainer } from 'src/model/trainer.entity';
import { Repository } from 'typeorm';
@Injectable()
export class PublicService {

    constructor(
        @InjectRepository(ClassType)
        private classTypeRepository: Repository<ClassType>,
        @InjectRepository(Trainer)
        private trainerRepository: Repository<Trainer>,
        @InjectRepository(ScheduledClasses)
        private scheduledClassesRepository: Repository<ScheduledClasses>,
    ){}

    // getBrands(): Promise<{manufacturer: string}[]> {
    //     return this.productRepository
    //         .createQueryBuilder()
    //         .distinct()
    //         .select(['manufacturer'])
    //         .execute();
    // }

    // getProduct(id: number): Promise<Product[]> {
    //     return this.productRepository.find({
    //         relations: ['features'],
    //         where: { id }
    //     });
    // }

    // getProducts(): Promise<Product[]> {
    //     return this.productRepository.find({
    //         relations: ['features'],
    //     });
    // }

    getClasses(): Promise<ClassType[]> {
        return this.classTypeRepository.find();
    }

    getTrainers(): Promise<Trainer[]> {
        return this.trainerRepository.find();
    }

    getTimetable(): Promise<ScheduledClasses[]> {
        return this.scheduledClassesRepository.find({
                    relations: ['class', 'trainer'],
                });
    }
}

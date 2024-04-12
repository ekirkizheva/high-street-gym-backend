import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { XMLParser } from 'fast-xml-parser';
import { ChangeLog } from 'src/model/changelog.entity';
import { ClassType } from 'src/model/class-type.entity';
import { Product } from 'src/model/product.entity';
import { ScheduledClasses } from 'src/model/scheduled-classes.entity';
import { Trainer } from 'src/model/trainer.entity';
import { User } from 'src/model/user.entityt';
import { Repository } from 'typeorm';


@Injectable()
export class AdminService {

    private xmlParser = new XMLParser();
    
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(ChangeLog)
        private changelogRepository: Repository<ChangeLog>,

        @InjectRepository(ClassType)
        private classTypeRepository: Repository<ClassType>,
        @InjectRepository(Trainer)
        private trainerRepository: Repository<Trainer>,
        @InjectRepository(ScheduledClasses)
        private scheduledClassesRepository: Repository<ScheduledClasses>,

      ) {}

    getUser(id:number): Promise<User[]> {
        return this.userRepository.findBy({id});
    }

    getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async putUser(id: number, user: User) {
        const updateUser = {...user};
        if (user.user_password) {
            updateUser.user_password = await bcrypt.hash(user.user_password, 10); 
        } else if ('user_password' in updateUser) {
            delete updateUser.user_password;
        }
        return await this.userRepository.update({id}, updateUser);
    }

    async postUser(user: User) {
        const user_password = await bcrypt.hash(user.user_password, 10); 
        return await this.userRepository.insert({...user,user_password });
    }

    async deleteUser(id: number) {
        if (id === 1) { 
            throw new ForbiddenException('Cannot delete admin user');
        } else {
            return await this.userRepository.delete({id});
        }
    }

    async postProduct(product: Product) {
        const prd = await this.productRepository.save(product);

        await this.changelogRepository.save({
            product: prd
        });

        return prd;
    }

    async putProduct(id:number, product: Product) {
        // Product modification implemented in accordance with the workardound
        // listed here: https://github.com/typeorm/typeorm/issues/1595
        const original = await this.productRepository.findOne({
            where: {id},
            relations: ['features']
        })
    
        if(original) {
            await this.productRepository.save(product) //This was the only way to garantee that a MANYTOMANY relationship was saved!

            const changeLog = await this.changelogRepository.findOne({
                where: { product },
                relations: ['product']
            })

            if (changeLog) {
                changeLog.date_last_modified = new Date();
                await this.changelogRepository.save(changeLog);
            } else {
                await this.changelogRepository.save({
                    date_last_modified: new Date(),
                    product
                })
            }
        }   

        const updated = await this.productRepository.findOne({where: {id}});
        return updated
    }

    deleteProduct(id: number) {
        return this.productRepository.delete({id});
    }

    getChangeLog() {
        return this.changelogRepository.find({
            relations: ['product']
        });
    }

    async postTrainer(xml: string) {
        const obj = this.xmlParser.parse(xml);

        if (obj && obj.Trainer && obj.Trainer.name) {
            const trainer = (await this.trainerRepository.findBy({name: obj.Trainer.name}))[0];

            if (trainer) {
                throw new ConflictException('Duplicate trainer found');
            }

            return await this.trainerRepository.insert({name: obj.Trainer.name});
        }
        
        throw new ConflictException('Invalid file format for uploading trainers');
    }

    async postClass(xml: string) {
        const obj = this.xmlParser.parse(xml);

        if (obj && obj.ScheduledClass) {
            const scheduledClass = obj.ScheduledClass;

            if (scheduledClass.weekday && 
                scheduledClass.time && 
                scheduledClass.duration && 
                scheduledClass.level && 
                scheduledClass.class && 
                scheduledClass.trainer) {

                const classType = (await this.classTypeRepository.findBy({name: scheduledClass.class}))[0];

                if (!classType) {
                    throw new ConflictException('Class type cannot be found');
                }

                const trainer = (await this.trainerRepository.findBy({name: scheduledClass.trainer}))[0];

                if (!trainer) {
                    throw new ConflictException('Trainer cannot be found');
                }

                const existingClass = (await this.scheduledClassesRepository.findBy({
                    weekday: scheduledClass.weekday,
                    time: scheduledClass.time
                }))[0];

                if (existingClass) {
                    throw new ConflictException('Conflicting day / time of the class');
                }

                return await this.scheduledClassesRepository.insert({
                    weekday: scheduledClass.weekday,
                    time: scheduledClass.time,
                    duration: scheduledClass.duration,
                    level: scheduledClass.level,
                    class: classType,
                    trainer: trainer
                });
            }
        }
        
        throw new ConflictException('Invalid file format for uploading classes');
    }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ChangeLog } from 'src/model/changelog.entity';
import { Product } from 'src/model/product.entity';
import { User } from 'src/model/user.entityt';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(ChangeLog)
        private changelogRepository: Repository<ChangeLog>,
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
}

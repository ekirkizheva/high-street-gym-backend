import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/model/product.entity';
import { User } from 'src/model/user.entityt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticatedService {

    constructor(
        @InjectRepository(Product)
        private userRepository: Repository<User>,
    ){}

    async postUser(user: User) {
        const user_password = await bcrypt.hash(user.user_password, 10); 
        return await this.userRepository.insert({...user,user_password });
    }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/model/blog.entity';
import { User } from 'src/model/user.entityt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticatedService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Blog)
        private blogRepository: Repository<Blog>,
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
}
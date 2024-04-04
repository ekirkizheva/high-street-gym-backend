import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './model/user.entityt';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService) {
  }

  async signIn(username: string, password: string) {

    if (!username || !password) {
        throw new UnauthorizedException('Missing arguments');
    }
    
    const user = await this.userRepository.findOneBy({ username });

    const isMatch = await bcrypt.compare(password, user?.user_password);

    if (!isMatch) {
      throw new UnauthorizedException('Access denied');
    }

    const payload = { sub: user.id, username: user.username, firstname: user.firstName, lastname: user.lastName, user_role: user.user_role };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}

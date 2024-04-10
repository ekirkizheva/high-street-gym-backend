import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/model/user.entityt';
import { AuthenticatedService } from './authenticated.service';

@Controller('authenticated')
export class AuthenticatedController {
    constructor(private readonly authenticatedService: AuthenticatedService) {}

    @Post('user')
    async postUser(@Body() userDTO: User) {
        return await this.authenticatedService.postUser(userDTO);
    }

}

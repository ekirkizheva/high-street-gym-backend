import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Blog } from 'src/model/blog.entity';
import { AuthenticatedService } from './authenticated.service';
import { MemberGuard } from './guards/memer.guard';

@Controller('authenticated')
export class AuthenticatedController {
    constructor(private readonly authenticatedService: AuthenticatedService) {}

    @UseGuards(MemberGuard)
    @Get('blog')
    async getBlog() {
      return (await this.authenticatedService.getBlog());
    }

    @UseGuards(MemberGuard)
    @Post('blog')
    async postBlog(@Request() req: any, @Body() blogDTO: Blog) {
      return (await this.authenticatedService.postBlog(req.user.username, blogDTO));
    }
}

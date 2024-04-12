import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
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

    @UseGuards(MemberGuard)
    @Get('availability/:date/:time')
    async getAvailability(@Request() req: any, @Param('date') date: Date, @Param('time') time: number) {
      return (await this.authenticatedService.getAvailability(date, time, req.user.username));
    }

    @UseGuards(MemberGuard)
    @Post('book')
    async postBooking(@Request() req: any,  @Body() booking: {date: Date, time: number, trainer:number}) {
      return (await this.authenticatedService.postBooking(booking.date, booking.time, booking.trainer, req.user.username));
    }
}

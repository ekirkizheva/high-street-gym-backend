import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Product } from 'src/model/product.entity';
import { User } from 'src/model/user.entityt';
import { AdminService } from './admin.service';
import { AdminGuard } from './guards/admin.guard';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) {}

    @UseGuards(AdminGuard)
    @Get('user')
    async getUsers(): Promise<Partial<User>[]> {
        return (await this.adminService.getUsers()).map(({ user_password, ...user }) => user);
    }

    @UseGuards(AdminGuard)
    @Get('user/:id')
    async getUser(@Param('id') id: number): Promise<Partial<User>> {
        return (await this.adminService.getUser(id)).map(({ user_password, ...user }) => user)[0];
    }

    @UseGuards(AdminGuard)
    @Post('user')
    async postUser(@Body() userDTO: User) {
        return await this.adminService.postUser(userDTO);
    }

    @UseGuards(AdminGuard)
    @Put('user/:id')
    async putUser(@Body() userDTO: User, @Param('id') id: number) {
        return await this.adminService.putUser(+id, userDTO);
    }

    @UseGuards(AdminGuard)
    @Delete('user/:id')
    async deleteUser(@Param('id') id: number) {
        return await this.adminService.deleteUser(+id);
    }

    @UseGuards(AdminGuard)
    @Post('product') 
    async postProduct(@Body() productDTO: Product) {
      return await this.adminService.postProduct(productDTO);
    }

    @UseGuards(AdminGuard)
    @Put('product/:id') 
    async putProduct(@Body() productDTO: Product, @Param('id') id: number) {
      return await this.adminService.putProduct(+id, productDTO);
    }

    @UseGuards(AdminGuard)
    @Delete('product/:id')
    async deleteProduct(@Param('id') id: number) {
        return await this.adminService.deleteProduct(+id);
    }

    @UseGuards(AdminGuard)
    @Get('changelog')
    async getChangeLog() {
        return await this.adminService.getChangeLog();
    }
}

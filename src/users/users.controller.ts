/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IUser } from './user.interfaces';

@Controller("users")
export class UsersController {
    users: IUser[] = [];

    @Get()
    getAllUsers(): IUser[] {
        return this.users;
    }

    @Get(':email')
    getUserByEmail(@Param('email') email: string): IUser {
        const user = this.users.find(user => user.email == email);
        return user;
    }

    @Post()
    newUser(@Body() user: IUser): IUser {
        this.users = [...this.users, user];
        return user;
    }

    @Put(':email')
    updateUser(@Param('email') email: string, @Body() editUser): IUser {
        this.users = this.users.filter(user => user.email !== email);
        this.users = [...this.users, this.newUser(editUser)];
        return editUser;
    }

    @Delete(':email')
    deleteUser(@Param('email') email: string) {
        this.users = this.users.filter(user => user.email !== email);
    }
}

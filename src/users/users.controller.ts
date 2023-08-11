import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from "./users.service";
import { User } from './user.entity';
import { updateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Get()
    getAllUsers(): Promise<User[]>{
        return this.usersService.getUsers();
    }

    @Get(':id')
    async getOneUser(@Param('id', ParseIntPipe) userId: number){
        const response = await this.usersService.getOneUser(userId);
        
        return response;
    }

    @Post('/signup')
    signupUser(@Body() newUser: createUserDto){
        return this.usersService.createUser(newUser);
    }

    @Post('/login')
    loginUser(@Body() User: LoginDto){
        return this.usersService.login(User);
    }   

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) userId: number){
        return this.usersService.deleteUser(userId);
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) userId: number, @Body() user: updateUserDto){
        return this.usersService.updateUser(userId, user);
    }

    @Patch('/admin/:id')
    updateToAdmin(@Param('id', ParseIntPipe) userId: number){
        return this.usersService.updateToAdmin(userId);
    }
}

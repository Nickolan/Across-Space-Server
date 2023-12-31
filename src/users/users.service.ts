import { Injectable, HttpException, HttpStatus, Next } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { AdminDto } from './dto/admin-check.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    async createUser(user: createUserDto){

        const userFound = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        }) 
        if (userFound) {
            return new HttpException('User already exists', HttpStatus.CONFLICT)
        }

        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    getUsers(){
        const users = this.userRepository.find();
        return users;
    }

    async getOneUser(id: number){
        const user = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if (!user) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return user;
    }

    async deleteUser(id: number){
        const response = await this.userRepository.delete({id})

        if (response.affected === 0) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        return response;
    }

    async updateUser(id: number, user: updateUserDto){
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const updatedUser = Object.assign(userFound, user)

        return this.userRepository.save(updatedUser);
    }

    async updateToAdmin(id: number){
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const updatedUser = Object.assign(userFound, {AccessLevel: "Admin"})

        return this.userRepository.save(updatedUser);
    }

    async login(user: LoginDto){
        const accessUser = await this.userRepository.findOne({
            where: {
                email: user.email
            }
        })

        if (!accessUser) {
            return {Access: false, Message: "This account does not exist"}
            //return new HttpException('Access denied', HttpStatus.NOT_ACCEPTABLE)
        } else {
            if (accessUser.password === user.password) {
                return {Access: true, Message: "Access allowed, Welcome"}
            } else{
                return {Access: false, Message: "Password incorrect"}
            }
        }

    }

    async adminAccess(user: AdminDto){
        const accessUser = await this.userRepository.findOne({
            where: {
                email: user.email
            }
        })

        if (!accessUser) {
            return {Access: false, Message: "This account does not exist"}
            //return new HttpException('Access denied', HttpStatus.NOT_ACCEPTABLE)
        } else {
            if (accessUser.password === user.password && accessUser.username === user.username && accessUser.AccessLevel === 'Admin') {
                return {Access: true, Message: "Access allowed, Welcome Administrator"}
            } else{
                return {Access: false, Message: "Access denied"}
            }
        }
    }
}

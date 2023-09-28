import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../schemas/user.schema';
import { CreatUserDto } from '../auth/dto/signup-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(@Query() query: ExpressQuery): Promise<User[]> {
    return this.usersService.findAll(query);
  }

  @Post()
  async createUser(
    @Body()
    user: CreatUserDto,
  ): Promise<User> {
    return this.usersService.create(user);
  }

  @Get(':id')
  async getUser(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.usersService.findById(id);
  }

  @Get('email/:email')
  async getUserByEmail(
    @Param('email')
    email: string,
  ): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @Put(':id')
  async updateUser(
    @Param('id')
    id: string,
    @Body()
    user: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id')
    id: string,
  ): Promise<void> {
    return this.usersService.delete(id);
  }
}

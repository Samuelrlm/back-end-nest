import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CreatUserDto } from './dto/create-user-dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllUsers(@Query() query: ExpressQuery): Promise<User[]> {
    return this.usersService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createUser(
    @Body()
    user: CreatUserDto,
  ): Promise<User> {
    return this.usersService.create(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getUser(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.usersService.findById(id);
  }

  @Get('email/:email')
  @UseGuards(AuthGuard())
  async getUserByEmail(
    @Param('email')
    email: string,
  ): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateUser(
    @Query('executorId')
    executorId: string,
    @Param('id')
    id: string,
    @Body()
    user: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, user as User, executorId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteUser(
    @Query('executorId')
    executorId: string,
    @Param('id')
    id: string,
  ): Promise<void> {
    return this.usersService.delete(id, executorId);
  }

  @Patch(':id/password')
  @UseGuards(AuthGuard())
  async updatePassword(
    @Param('id') id: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.usersService.updatePassword(id, password);
  }
}

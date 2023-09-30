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
import { UpdatePasswordDto } from './dto/update-password-dto';

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
    return this.usersService.create(user as User);
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
    @Param('id')
    id: string,
    @Body()
    user: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, user as User);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteUser(
    @Param('id')
    id: string,
  ): Promise<void> {
    return this.usersService.delete(id);
  }

  @Patch('update/password')
  @UseGuards(AuthGuard())
  async updatePassword(
    @Body()
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    return this.usersService.updatePassword(updatePasswordDto);
  }
}

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
import {
  ApiBadRequestResponse,
  ApiHeaders,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { OkResponse } from 'src/helpres/swagger/ok-response';
import { BadRequest } from 'src/helpres/swagger/bad-request';
import { OkPostUserResponse } from 'src/helpres/swagger/ok-post-user-response';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuarios' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer {token}' }])
  @ApiOkResponse({
    description: 'Lista de usuarios',
    type: [OkResponse],
  })
  @ApiBadRequestResponse({
    description: 'Erro ao listar usuarios',
    type: BadRequest,
  })
  @UseGuards(AuthGuard())
  async getAllUsers(@Query() query: ExpressQuery): Promise<User[]> {
    return this.usersService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuario' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer {token}' }])
  @ApiOkResponse({
    description: 'Usuario criado com sucesso',
    type: OkPostUserResponse,
  })
  @ApiBadRequestResponse({
    description: 'Erro ao criar usuario',
    type: BadRequest,
  })
  @UseGuards(AuthGuard())
  async createUser(
    @Body()
    user: CreatUserDto,
  ): Promise<User> {
    return this.usersService.create(user as User);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca usuario por id' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer {token}' }])
  @ApiOkResponse({
    description: 'Usuario encontrado',
    type: OkPostUserResponse,
  })
  @ApiBadRequestResponse({
    description: 'Erro ao buscar usuario',
    type: BadRequest,
  })
  @UseGuards(AuthGuard())
  async getUser(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.usersService.findById(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Busca usuario por email' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer {token}' }])
  @ApiOkResponse({
    description: 'Usuario encontrado',
    type: OkPostUserResponse,
  })
  @ApiBadRequestResponse({
    description: 'Erro ao buscar usuario',
    type: BadRequest,
  })
  @UseGuards(AuthGuard())
  async getUserByEmail(
    @Param('email')
    email: string,
  ): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza usuario por id' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer {token}' }])
  @ApiOkResponse({
    description: 'Usuario atualizado',
    type: OkPostUserResponse,
  })
  @ApiBadRequestResponse({
    description: 'Erro ao atualizar usuario',
    type: BadRequest,
  })
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
  @ApiOperation({ summary: 'Deleta usuario por id' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer {token}' }])
  @ApiOkResponse({
    description: 'Usuario deletado',
    type: OkResponse,
  })
  @ApiBadRequestResponse({
    description: 'Erro ao deletar usuario',
    type: BadRequest,
  })
  @UseGuards(AuthGuard())
  async deleteUser(
    @Param('id')
    id: string,
  ): Promise<void> {
    return this.usersService.delete(id);
  }

  @Patch('update/password')
  @ApiOperation({ summary: 'Atualiza senha do usuario' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer {token}' }])
  @ApiOkResponse({
    description: 'Senha atualizada',
    type: OkResponse,
  })
  @ApiBadRequestResponse({
    description: 'Erro ao atualizar senha',
    type: BadRequest,
  })
  @UseGuards(AuthGuard())
  async updatePassword(
    @Body()
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    return this.usersService.updatePassword(updatePasswordDto);
  }
}

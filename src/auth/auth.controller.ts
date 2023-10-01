import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup-dto';
import { LoginDto } from './dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequest } from 'src/helpres/swagger/bad-request';
import { TokenResponse } from 'src/helpres/swagger/token-response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Cria um novo cadastro de usuário' })
  @ApiCreatedResponse({
    description: 'Cadastro realizado com sucesso',
    type: TokenResponse,
  })
  @ApiBadRequestResponse({
    description: 'Erro ao realizar cadastro',
    type: BadRequest,
  })
  singUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/login')
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiOkResponse({
    description: 'Login realizado com sucesso',
    type: TokenResponse,
  })
  @ApiBadRequestResponse({
    description: 'Erro ao realizar login',
    type: BadRequest,
  })
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}

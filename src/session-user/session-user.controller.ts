import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SessionUserService } from './session-user.service';
import { AuthGuard } from '@nestjs/passport';
import { LogoutDto } from './dto/logout.dto';
import {
  ApiBadRequestResponse,
  ApiHeaders,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequest } from '../helpres/swagger/bad-request';
import { OkRequestSession } from '../helpres/swagger/ok-request-session';
import { OkLogout } from '../helpres/swagger/ok-logout';

@ApiTags('session-user')
@Controller('session-user')
export class SessionUserController {
  constructor(private sessionUserService: SessionUserService) {}

  @Get()
  @ApiOperation({ summary: 'Exibe todas as sessões ativas' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer {token}' }])
  @ApiOkResponse({
    description: 'Lista de sessões ativas',
    type: OkRequestSession,
  })
  @ApiBadRequestResponse({
    description: 'Erro ao listar sessões ativas',
    type: BadRequest,
  })
  @UseGuards(AuthGuard())
  async getAllSessions() {
    return this.sessionUserService.getAllSessions();
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Logout do usuário' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer {token}' }])
  @ApiOkResponse({
    description: 'Logout realizado com sucesso',
    type: OkLogout,
  })
  @ApiBadRequestResponse({
    description: 'Erro ao realizar logout',
    type: BadRequest,
  })
  @UseGuards(AuthGuard())
  logout(@Body() logoutDto: LogoutDto): Promise<{ token: string }> {
    return this.sessionUserService.logout(logoutDto);
  }
}

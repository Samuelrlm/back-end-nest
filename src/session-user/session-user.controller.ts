import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SessionUserService } from './session-user.service';
import { AuthGuard } from '@nestjs/passport';
import { LogoutDto } from './dto/logout.dto';

@Controller('session-user')
export class SessionUserController {
  constructor(private sessionUserService: SessionUserService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllSessions() {
    return this.sessionUserService.getAllSessions();
  }

  @Post('/logout')
  @UseGuards(AuthGuard())
  logout(@Body() logoutDto: LogoutDto): Promise<{ token: string }> {
    return this.sessionUserService.logout(logoutDto);
  }
}

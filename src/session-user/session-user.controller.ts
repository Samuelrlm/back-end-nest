import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { SessionUserService } from './session-user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('session-user')
export class SessionUserController {
  constructor(private sessionUserService: SessionUserService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllSessions() {
    return this.sessionUserService.getAllSessions();
  }

  @Delete(':userId')
  @UseGuards(AuthGuard())
  async deleteSession(
    @Param('userId')
    deleteSessionUserId: string,
  ) {
    return this.sessionUserService.deleteSession(deleteSessionUserId);
  }
}

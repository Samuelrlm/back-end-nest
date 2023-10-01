import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BlackListService } from './black-list.service';
import { AuthGuard } from '@nestjs/passport';
import { AddTokenDto } from './dto/add-token-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('black-list')
@Controller('black-list')
export class BlackListController {
  constructor(private blackListService: BlackListService) {}

  @Post()
  @UseGuards(AuthGuard())
  async addTokenToBlackList(@Body() token: AddTokenDto) {
    return this.blackListService.addToken(token as AddTokenDto);
  }
}

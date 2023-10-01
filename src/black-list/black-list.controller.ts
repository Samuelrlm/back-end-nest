import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BlackListService } from './black-list.service';
import { AuthGuard } from '@nestjs/passport';
import { AddTokenDto } from './dto/add-token-dto';
import {
  ApiBadRequestResponse,
  ApiHeaders,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequest } from 'src/helpres/swagger/bad-request';

@ApiTags('black-list')
@Controller('black-list')
export class BlackListController {
  constructor(private blackListService: BlackListService) {}

  @Post()
  @ApiOperation({ summary: 'Adiciona um token na black list' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer {token}' }])
  @ApiOkResponse({
    description: 'Token adicionado na black list',
    type: AddTokenDto,
  })
  @ApiBadRequestResponse({
    description: 'Erro ao adicionar token na black list',
    type: BadRequest,
  })
  @UseGuards(AuthGuard())
  async addTokenToBlackList(@Body() token: AddTokenDto) {
    return this.blackListService.addToken(token as AddTokenDto);
  }
}

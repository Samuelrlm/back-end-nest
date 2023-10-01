import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BlackList } from 'src/schemas/black.list.schema';
import { AddTokenDto } from './dto/add-token-dto';

@Injectable()
export class BlackListService {
  constructor(
    @InjectModel(BlackList.name)
    private blackListModel: mongoose.Model<BlackList>,
  ) {}

  async addToken(addTokenDto: AddTokenDto): Promise<any> {
    const { token } = addTokenDto;
    return await this.blackListModel.create({ token });
  }
}

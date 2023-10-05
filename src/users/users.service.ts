import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import * as bcrypt from 'bcryptjs';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { MyGateway } from '../getway/gateway';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private readonly myGateway: MyGateway,
  ) {}

  async findAll(query: Query): Promise<User[]> {
    const resPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    if (currentPage < 1) {
      throw new NotFoundException('Page must be greater than 0');
    }

    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const users = await this.userModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);

    return users;
  }

  async create(user: User): Promise<User> {
    const hashPassword = await bcrypt.hash(user.password, 10);

    const res = await this.userModel.create(
      Object.assign(user, { password: hashPassword }),
    );

    return res;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });

    return user;
  }

  async update(id: string, user: User): Promise<User> {
    await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
    const updatedUser = await this.userModel.findById(id);

    const users = await this.userModel.find();

    this.myGateway.emitUserList(users);

    return updatedUser;
  }

  async delete(id: string): Promise<any> {
    await this.userModel.findByIdAndDelete(id);

    const users = await this.userModel.find();

    this.myGateway.emitUserList(users);

    return { message: 'User deleted' };
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<User> {
    const { id, password } = updatePasswordDto;
    const hashPassword = await bcrypt.hash(password, 10);

    await this.userModel.findByIdAndUpdate(
      id,
      { password: hashPassword },
      {
        new: true,
        runValidators: true,
      },
    );

    const updatedUser = await this.userModel.findById(id);

    return updatedUser;
  }
}

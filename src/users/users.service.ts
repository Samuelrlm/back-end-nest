import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
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
    const res = await this.userModel.create(user);

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

  async update(id: string, user: User, executorId: string): Promise<User> {
    if (!executorId) {
      throw new NotFoundException('Missing executor id');
    } else {
      await this.userModel.findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true,
      });
    }
    const updatedUser = await this.userModel.findById(id);

    return updatedUser;
  }

  async delete(id: string, executorId: string): Promise<void> {
    if (!executorId) {
      throw new NotFoundException('Missing executor id');
    } else {
      return await this.userModel.findByIdAndDelete(id);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    const removePassword = users.map((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      return userObj;
    });

    return removePassword;
  }

  async create(user: User): Promise<User> {
    const res = await this.userModel.create(user);
    const removePassword = res.toObject();
    delete removePassword.password;

    return removePassword;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    const removePassword = user.toObject();
    delete removePassword.password;

    return removePassword;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    const removePassword = user.toObject();
    delete removePassword.password;

    return removePassword;
  }

  async update(id: string, user: User): Promise<User> {
    await this.userModel.findByIdAndUpdate(id, user);
    const updatedUser = await this.userModel.findById(id);
    const removePassword = updatedUser.toObject();
    delete removePassword.password;

    return removePassword;
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);

    return;
  }
}

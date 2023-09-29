import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup-dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password, permissionLevel } = signUpDto;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      permissionLevel,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(LoginDto: LoginDto): Promise<{ token: string }> {
    const { email } = LoginDto;

    const user = await this.userModel.findOne({
      email: email,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}

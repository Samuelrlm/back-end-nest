import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup-dto';
import { LoginDto } from './dto/login.dto';
import { SessionUser } from '../schemas/session.user.schema';
import { BlackList } from '../../src/schemas/black.list.schema';
import { VerifyTokenDto } from './dto/verify.token.dto';
import { MyGetway } from '../getway/getway';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(SessionUser.name) private sessionUserModel: Model<SessionUser>,
    @InjectModel(BlackList.name) private blackListModel: Model<BlackList>,
    private jwtService: JwtService,
    private readonly myGetway: MyGetway,
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

    const token = this.jwtService.sign({
      id: user._id,
      email: user.email,
      name: user.name,
      permissionLevel: user.permissionLevel,
    });

    const users = await this.userModel.find();

    this.myGetway.emitUserList(users);

    return { token };
  }

  async login(LoginDto: LoginDto): Promise<{
    email: string;
    name: string;
    permissionLevel: number;
    token: string;
  }> {
    const { email } = LoginDto;

    const userInSessionActive = await this.sessionUserModel.findOne({
      email: email,
    });

    if (userInSessionActive) {
      await this.sessionUserModel.deleteOne({
        email: email,
      });

      await this.blackListModel.create({
        token: userInSessionActive.token,
      });

      const user = await this.userModel.findOne({
        email: email,
      });

      const token = this.jwtService.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        permissionLevel: user.permissionLevel,
      });

      await this.sessionUserModel.create({
        userId: user._id,
        email: user.email,
        token: token,
      });

      return {
        email: user.email,
        name: user.name,
        permissionLevel: user.permissionLevel,
        token,
      };
    } else {
      const user = await this.userModel.findOne({
        email: email,
      });

      const token = this.jwtService.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        permissionLevel: user.permissionLevel,
      });

      await this.sessionUserModel.create({
        userId: user._id,
        email: user.email,
        token: token,
      });

      return {
        email: user.email,
        name: user.name,
        permissionLevel: user.permissionLevel,
        token,
      };
    }
  }

  async verifyToken(tokenDto: VerifyTokenDto): Promise<{ token: boolean }> {
    const { token } = tokenDto;

    const blackList = await this.blackListModel.findOne({ token });
    const session = await this.sessionUserModel.findOne({ token });

    if (blackList) {
      return { token: false };
    }

    if (!session) {
      return { token: false };
    }

    return { token: true };
  }
}

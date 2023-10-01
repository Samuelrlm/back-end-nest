import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsEmail,
  MinLength,
} from 'class-validator';
import { permissionLevel } from '../../../src/schemas/user.schema';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(permissionLevel, { message: 'Invalid permission level' })
  readonly permissionLevel: permissionLevel;
}

import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { permissionLevel } from '../schemas/user.schema';
export class CreatUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(permissionLevel, { message: 'Invalid permission level' })
  readonly permissionLevel: permissionLevel;
}

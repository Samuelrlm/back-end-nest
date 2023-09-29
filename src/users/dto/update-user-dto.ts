import { IsOptional, IsString, IsEnum, IsEmail } from 'class-validator';
import { permissionLevel } from '../../schemas/user.schema';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsEnum(permissionLevel, { message: 'Invalid permission level' })
  readonly permissionLevel?: permissionLevel;

  @IsOptional()
  @IsString()
  readonly createdBy?: string;
}

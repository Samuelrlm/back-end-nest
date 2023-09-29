import { IsOptional, IsString, IsEnum } from 'class-validator';
import { permissionLevel } from '../../schemas/user.schema';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsEnum(permissionLevel, { message: 'Invalid permission level' })
  readonly permissionLevel: permissionLevel;

  @IsOptional()
  @IsString()
  readonly createdBy: string;
}

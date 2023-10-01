import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsEmail,
  MinLength,
} from 'class-validator';
import { permissionLevel } from '../../schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreatUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    type: String,
    example: 'Tallos',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Email de acesso do usuário. Deve ser único no banco de dados',
    type: String,
    example: 'test@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @ApiProperty({
    description: 'Senha de acesso do usuário',
    type: String,
    example: '123456',
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  readonly password: string;

  @ApiProperty({
    description: 'Nível de permissão do usuário',
    type: String,
    example: 'ADMIN',
    enum: ['ADMIN', 'EDITOR', 'VIEWER'],
  })
  @IsNotEmpty()
  @IsEnum(permissionLevel, { message: 'Invalid permission level' })
  readonly permissionLevel: permissionLevel;

  @ApiProperty({
    description:
      'Id do usuário que criou o usuário atual, esse campo é preenchido automaticamente dentro do Middleware',
    type: String,
    example: '60e9e3b3d4c0e80015f6c9f2',
  })
  @IsNotEmpty()
  @IsString()
  readonly createdBy: string;
}

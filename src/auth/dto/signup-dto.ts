import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsEmail,
  MinLength,
} from 'class-validator';
import { permissionLevel } from '../../../src/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
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
    example: 'tallos@gmail.com',
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
}

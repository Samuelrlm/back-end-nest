import { IsOptional, IsString, IsEnum, IsEmail } from 'class-validator';
import { permissionLevel } from '../../schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    type: String,
    example: 'Tallos',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({
    description: 'Email de acesso do usuário. Deve ser único no banco de dados',
    type: String,
    example: 'teste@gmail.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiProperty({
    description: 'Senha de acesso do usuário',
    type: String,
    example: '123456',
    required: false,
  })
  @IsOptional()
  @IsEnum(permissionLevel, { message: 'Invalid permission level' })
  readonly permissionLevel?: permissionLevel;
}

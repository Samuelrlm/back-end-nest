import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'Id do usuário',
    type: String,
    example: '60e9e3b3d4c0e80015f6c9f2',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description:
      'Apenas o os usuarios com permissao maior que 1 EDITOR podem executar essa ação, se o usuario executor for o mesmo a ser alterado, nao pede permissão. Senha do usuario a ser atualizada, se o usuario que esta executando a api for diferente do usuario a ser atualizada sera por padrao "123456"',
    type: String,
    example: 'secret pass',
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

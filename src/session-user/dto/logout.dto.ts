import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LogoutDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description:
      'Token aativo que deve ser removido da session user e adicionado na black list',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly token: string;
}

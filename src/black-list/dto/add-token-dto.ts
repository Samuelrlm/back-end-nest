import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddTokenDto {
  @ApiProperty({
    description: 'Token a ser adicionado na black list',
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  @IsNotEmpty()
  @IsString()
  readonly token: string;
}

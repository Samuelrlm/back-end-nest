import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteSessionUserDto {
  @ApiProperty({
    description: 'Id do usuário',
    type: String,
    example: '60e9e3b3d4c0e80015f6c9f2',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
}

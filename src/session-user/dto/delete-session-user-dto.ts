import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteSessionUserDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}

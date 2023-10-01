import { IsNotEmpty, IsString } from 'class-validator';

export class AddTokenDto {
  @IsNotEmpty()
  @IsString()
  readonly token: string;
}

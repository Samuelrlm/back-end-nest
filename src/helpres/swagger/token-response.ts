import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  token: string;
}

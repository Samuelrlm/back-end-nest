import { ApiProperty } from '@nestjs/swagger';

export class OkLogout {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}

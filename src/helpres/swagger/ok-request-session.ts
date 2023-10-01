import { ApiProperty } from '@nestjs/swagger';

export class OkRequestSession {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  data: {
    id: string;
    email: string;
    token: string;
  };
}

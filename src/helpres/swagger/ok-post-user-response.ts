import { ApiProperty } from '@nestjs/swagger';

export class OkPostUserResponse {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  data: {
    id: string;
    name: string;
    email: string;
    permissiionLevel: number;
    createdAt: string;
    updatedAt: string;
  };
}

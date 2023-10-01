import { ApiProperty } from '@nestjs/swagger';
import { SignUpDto } from 'src/auth/dto/signup-dto';

export class OkResponse {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  data: Array<SignUpDto>;
}

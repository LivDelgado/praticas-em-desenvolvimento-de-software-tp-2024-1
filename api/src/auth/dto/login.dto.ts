import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min, NotEquals } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    description: 'Username, should be a string',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password, should be a string',
  })
  @IsString()
  password: string;
}

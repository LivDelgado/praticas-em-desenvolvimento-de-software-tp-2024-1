import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { UserRole } from '../../users/entity/user.entity';

export class SignupRequestDto {
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

  @ApiProperty({
    description: 'Role, can be APPLICANT or COMPANY',
  })
  @IsEnum(UserRole)
  role: UserRole;
}

import { ApiProperty } from '@nestjs/swagger';
import { Job, JobType, ExperienceLevel } from '../job/entity/job.entity';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  IsTaxId,
  isNumber,
} from 'class-validator';
import { User } from 'src/users/entity/user.entity';

export class JobDto {
  @IsString()
  @ApiProperty({
    description: 'Title of the job',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Descripiton of the job',
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: 'Contact Phone of the annunciator',
  })
  contactPhone: string;

  @IsString()
  @ApiProperty({
    description: 'Email of the annunciator',
  })
  email: string;

  @ApiProperty({
    description: 'Company id',
  })
  companyId: number;

  @IsString()
  @ApiProperty({
    description: 'Location of the job',
  })
  location: string;

  @IsEnum(JobType)
  @ApiProperty({
    enum: ['ON_SITE', 'HYBRID', 'REMOTE'],
    description: 'The type of job',
    default: JobType.ON_SITE,
  })
  type: JobType;

  @IsNumber()
  @ApiProperty({
    description: 'Min salary of the job',
  })
  minSalary: number;

  @IsNumber()
  @ApiProperty({
    description: 'Max salary of the job',
  })
  maxSalary: number;

  @IsString()
  @ApiProperty({
    description: 'Image adress of the job',
  })
  imageUrl: string;

  @IsEnum(ExperienceLevel)
  @ApiProperty({
    enum: ['ALL', 'entryLevel', 'midSeniorLevel'],
    description: 'Experience level of job',
    default: ExperienceLevel.ALL,
  })
  experience: ExperienceLevel;

  @IsBoolean()
  @ApiProperty({
    description: 'Accept full time',
  })
  allowFullTime: boolean;

  @IsBoolean()
  @ApiProperty({
    description: 'Accept interim (temporário)',
  })
  allowInterim: boolean;

  @IsBoolean()
  @ApiProperty({
    description: 'Accept part time',
  })
  allowPartTime: boolean;
}

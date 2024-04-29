import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { JobDto } from '../job.dto';
import { JobsService } from '../jobs.service';
import { HttpExceptionFilter } from '../../http-exception.filter';
import { Job } from '../entity/job.entity';

@Controller('job')
@UseFilters(new HttpExceptionFilter())
export class JobsController {
  constructor(private jobService: JobsService) {}

  @Get('/:userId')
  @UseFilters(new HttpExceptionFilter())
  async get(@Param('userId', new ParseIntPipe()) companyId): Promise<Job[]> {
    return this.jobService.get(companyId);
  }

  @Post()
  async post(@Body() jobDto: JobDto): Promise<Job> {
    return this.jobService.create(
      jobDto.name,
      jobDto.description,
      jobDto.contactPhone,
      jobDto.email,
      jobDto.companyId,
      jobDto.location,
      jobDto.type,
      jobDto.minSalary,
      jobDto.maxSalary,
      jobDto.imageUrl,
      jobDto.experience,
      jobDto.allowFullTime,
      jobDto.allowInterim,
      jobDto.allowPartTime,
    );
  }
}

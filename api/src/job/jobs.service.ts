import { Inject, Injectable } from '@nestjs/common';
import { JobsDataSource } from './datasource/job.datasource';
import { UsersDataSource } from '../users/datasource/user.datasource';
import { UserRole } from '../users/entity/user.entity';

@Injectable()
export class JobsService {
  constructor(
    @Inject(JobsDataSource) private readonly jobsDataSource: JobsDataSource,
    @Inject(UsersDataSource) private readonly usersDataSource: UsersDataSource,
  ) {}

  async findOne(id) {
    var job = await this.jobsDataSource.findOne(id);
    return job;
  }

  async get(userId: number) {
    var user = await this.usersDataSource.findById(userId);
    var jobs;
    if (user.role == UserRole.COMPANY) {
      jobs = await this.jobsDataSource.getCompanyJobs(userId);
    } else {
      jobs = await this.jobsDataSource.get();
    }

    return jobs;
  }

  async create(
    name,
    description,
    contactPhone,
    email,
    companyId,
    location,
    type,
    minSalary,
    maxSalary,
    imageUrl,
    experience,
    allowFullTime,
    allowInterim,
    allowPartTime,
  ) {
    return this.jobsDataSource.save({
      name,
      description,
      contactPhone,
      email,
      companyId,
      location,
      type,
      minSalary,
      maxSalary,
      imageUrl,
      experience,
      allowFullTime,
      allowInterim,
      allowPartTime,
    });
  }
}

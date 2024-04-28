import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../entity/job.entity';
import { User } from '../../users/entity/user.entity';

@Injectable()
@Dependencies(getRepositoryToken(Job))
export class JobsDataSource {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async save({
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
  }): Promise<Job> {
    const newJob = this.jobRepository.create({
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
    return await this.jobRepository.save(newJob);
  }

  async findOne(id: number): Promise<Job> {
    return this.jobRepository.findOneBy({ id });
  }

  async get(): Promise<Job[]> {
    return this.jobRepository.find({
      order: {
        date: 'DESC',
      },
    });
  }

  async getCompanyJobs(id: number): Promise<Job[]> {
    return this.jobRepository.find({
      where: {
        companyId: id,
      },
    });
  }
}

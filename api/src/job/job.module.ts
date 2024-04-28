import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entity/job.entity';
import { JobsDataSource } from './datasource/job.datasource';
import { User } from 'src/users/entity/user.entity';
import { UsersDataSource } from 'src/users/datasource/user.datasource';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), TypeOrmModule.forFeature([User])],
  providers: [JobsService, JobsDataSource, UsersDataSource],
  exports: [JobsService, TypeOrmModule],
})
export class JobsModule {}

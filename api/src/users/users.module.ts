import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersDataSource } from './datasource/user.datasource';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersDataSource],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}

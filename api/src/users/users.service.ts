import { Inject, Injectable } from '@nestjs/common';
import { UsersDataSource } from './datasource/user.datasource';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersDataSource) private readonly usersDataSource: UsersDataSource,
  ) {}

  async findOne(username) {
    var user = await this.usersDataSource.findOne(username);
    return user;
  }

  async create(username, password, role) {
    return this.usersDataSource.save({
      username,
      password,
      role,
    });
  }
}

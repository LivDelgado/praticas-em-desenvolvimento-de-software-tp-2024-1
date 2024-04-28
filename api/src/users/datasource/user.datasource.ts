import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
@Dependencies(getRepositoryToken(User))
export class UsersDataSource {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async save({ username, password, role }): Promise<User> {
    const newUser = this.userRepository.create({
      username,
      password,
      role,
    });
    return await this.userRepository.save(newUser);
  }

  async findOne(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
}

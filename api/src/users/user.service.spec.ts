import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersDataSource } from './datasource/user.datasource';
import { User, UserRole } from './entity/user.entity';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersDataSource: UsersDataSource;

  const mockUsersDataSource = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersDataSource, useValue: mockUsersDataSource },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersDataSource = module.get<UsersDataSource>(UsersDataSource);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user if a user with the given username is found', async () => {
      const testUser: User = {
        id: 1,
        username: 'testuser',
        password: 'testpass',
        role: UserRole.APPLICANT,
        date: new Date(),
      };
      mockUsersDataSource.findOne.mockResolvedValue(testUser);

      const user = await usersService.findOne('testuser');

      expect(user).toEqual(testUser);
    });
  });

  describe('create', () => {
    it('should create a new user and return it', async () => {
      const testUser: User = {
        id: 1,
        username: 'testuser',
        password: 'testpass',
        role: UserRole.APPLICANT,
        date: new Date(),
      };
      mockUsersDataSource.save.mockResolvedValue(testUser);

      const user = await usersService.create('newuser', 'newpass', 'user');

      expect(user).toEqual(testUser);
    });
  });
});
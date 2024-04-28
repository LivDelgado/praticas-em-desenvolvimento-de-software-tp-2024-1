import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { User, UserRole } from '../../users/entity/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return a JWT when credentials are valid', async () => {
      const testUser: User = {
        id: 1,
        username: 'testuser',
        password: 'testpass',
        role: UserRole.APPLICANT,
        date: new Date(),
      };

      mockUsersService.findOne.mockResolvedValue(testUser);
      mockJwtService.signAsync.mockResolvedValue('testtoken');

      const result = await authService.signIn('testuser', 'testpass');

      expect(result).toEqual({
        access_token: 'testtoken',
        user: testUser,
      });
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      mockUsersService.findOne.mockResolvedValue(null);

      await expect(authService.signIn('testuser', 'testpass')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('signUp', () => {
    it('should return a JWT when registration is successful', async () => {
      const testUser: User = {
        id: 1,
        username: 'testuser',
        password: 'testpass',
        role: UserRole.APPLICANT,
        date: new Date(),
      };

      mockUsersService.create.mockResolvedValue(testUser);
      mockJwtService.signAsync.mockResolvedValue('testtoken');

      const result = await authService.signUp(
        'testuser',
        'testpass',
        UserRole.APPLICANT,
      );

      expect(result).toEqual({
        access_token: 'testtoken',
        user: testUser,
      });
    });
  });
});
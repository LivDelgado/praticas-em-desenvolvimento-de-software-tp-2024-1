import { UserRole, User } from './user.entity';

describe('User', () => {
  it('should create a user with default role and date', () => {
    // Create a new user
    const user = new User();
    user.id = 1;
    user.role = UserRole.APPLICANT;
    user.username = 'john_doe';
    user.password = 'password123';

    // Expectations
    expect(user.id).toBe(1);
    expect(user.username).toBe('john_doe');
    expect(user.password).toBe('password123');
    expect(user.role).toBe(UserRole.APPLICANT);
  });
});

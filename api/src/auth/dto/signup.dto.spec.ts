import { SignupRequestDto } from './signup.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UserRole } from '../../users/entity/user.entity';

describe('SignupRequestDto', () => {
  it('should validate if username, password are strings and role is a valid UserRole', async () => {
    const dto = plainToClass(SignupRequestDto, {
      username: 123,
      password: { complex: 'object' },
      role: 'INVALID_ROLE'
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(3);
    expect(errors[0].constraints).toEqual({
      isString: 'username must be a string',
    });
    expect(errors[1].constraints).toEqual({
      isString: 'password must be a string',
    });
    expect(errors[2].constraints).toEqual({
      isEnum: 'role must be one of the following values: APPLICANT, COMPANY',
    });
  });

  it('should not throw errors if username, password are valid and role is a valid UserRole', async () => {
    const dto = plainToClass(SignupRequestDto, {
      username: 'validUsername',
      password: 'validPassword',
      role: UserRole.APPLICANT
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });
});
import { LoginRequestDto } from './login.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

describe('LoginRequestDto', () => {
  it('should validate if username and password are strings', async () => {
    const dto = plainToClass(LoginRequestDto, {
      username: 123,
      password: { complex: 'object' },
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(2);
    expect(errors[0].constraints).toEqual({
      isString: 'username must be a string',
    });
    expect(errors[1].constraints).toEqual({
      isString: 'password must be a string',
    });
  });

  it('should not throw errors if username and password are valid', async () => {
    const dto = plainToClass(LoginRequestDto, {
      username: 'validUsername',
      password: 'validPassword',
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });
});
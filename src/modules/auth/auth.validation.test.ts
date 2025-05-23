import { registerSchema } from './auth.validation';

describe('registerSchema', () => {
  it('should pass with valid data', () => {
    expect(() =>
      registerSchema.parse({ email: 'a@b.com', password: '123456' })
    ).not.toThrow();
  });

  it('should fail with invalid email', () => {
    expect(() =>
      registerSchema.parse({ email: 'abc', password: '123456' })
    ).toThrow();
  });

  it('should fail with short password', () => {
    expect(() =>
      registerSchema.parse({ email: 'a@b.com', password: '123' })
    ).toThrow();
  });
});

import { AuthService } from './authService';

jest.mock('bcrypt', () => ({
    compareSync: jest.fn(() => true),
  }));

describe('Auth service', () => {
  let authService;
  beforeAll(() => {
    authService = new AuthService();
  });

  it('should throw on auth error', async () => {
    const authenticateWrapper = () => {
        authService.authenticate({
            email: 'philipe@test.com',
            password: '12345'
        }, '12345');
    }

    expect(authenticateWrapper).toThrow('Invalid credentials');
  });
});

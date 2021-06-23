import { AuthService } from './authService';

jest.mock('bcrypt', () => ({
    compareSync: jest.fn(() => false),
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
            password: '1234'
        }, '12345');
    }

    expect(authenticateWrapper).toThrow('Invalid credentials');
  });
});

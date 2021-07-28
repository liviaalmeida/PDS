import { AuthService } from './authService';
import { auth } from '../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('bcrypt', () => ({
    compareSync: jest.fn(() => false),
    // verify: jest.fn(() => { throw new Error() }),
  }));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'cool-token'),
  verify: jest.fn(() => { throw new Error() })
}));

describe('Auth service', () => {
  let authService;
  beforeAll(() => {
    authService = new AuthService();
  });

  it('should authenticate successfully', async () => {
    const compareSpy = jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => true);

    authService.authenticate({
        email: 'philipe@test.com',
        password: '123456'
    }, 'passwordhash');

    expect(compareSpy).toHaveBeenCalledWith('123456', 'passwordhash');
    compareSpy.mockReset();
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

  it('should throw on invalid token', async () => {
    const authenticateWrapper = () => {
        authService.verifyToken('abcdefg123145');
    }

    expect(authenticateWrapper).toThrow('Invalid auth token');
  });

  it('should call sign with correct params', async () => {
    const token = authService.generateToken('philipe@teste.com');
    const signSpy = jest.spyOn(jwt, 'sign');
    // const signSpy = jest.spyOn(jwt, 'generateToken').mockImplementation(() => 'cool-token');

    expect(token).toBe('cool-token');
    expect(signSpy).toHaveBeenCalledWith({ userEmail: 'philipe@teste.com' }, auth.secret, { expiresIn: auth.expires });
  });
});

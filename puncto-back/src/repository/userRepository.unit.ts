jest.mock('bcrypt', () => ({
    compareSync: jest.fn(() => false),
  }));

describe('Auth service', () => {
  let userRepository;

  it('should call save with correct params', async () => {
    await userRepository.createUser({
        email: "anyname@test.com",
        password: "password123"
    });
    
    const authenticateWrapper = () => {
        userRepository.authenticate({
            email: 'philipe@test.com',
            password: '1234'
        }, '12345');
    }

    expect(authenticateWrapper).toThrow('Invalid credentials');
  });
});

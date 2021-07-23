import supertest from 'supertest';

import app from '../server';

const testApi = supertest(app);

describe('Users test suite', () => {
  it('can log in', async () => {
    const res = await testApi.post('/login').set('Accept', 'application/json').send({
      email: 'test@test.com',
      password: 123456,
    });
    expect(res.status).toBe(404);
  });
});

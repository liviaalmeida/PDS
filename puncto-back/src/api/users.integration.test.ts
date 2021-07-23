import supertest from 'supertest';

import { createConnection } from 'typeorm';
import { connectionOptions } from '../config';
import app from '../server';
import { truncate } from '../test-utils/helpers';

const testApi = supertest(app);

describe('Users test suite', () => {
  beforeAll(async () => {
    await createConnection(connectionOptions);
  });

  beforeEach(async () => {
    await truncate();
  });

  it('can create new user', async () => {
    const signupRes = await testApi.post('/signup').set('Accept', 'application/json').send({
      email: 'test@test.com',
      password: '123456',
    });

    expect(signupRes.status).toBe(201);
  });

  it('can log in', async () => {
    await testApi.post('/signup').set('Accept', 'application/json').send({
      email: 'test@test.com',
      password: '123456',
    });

    const res = await testApi.post('/login').set('Accept', 'application/json').send({
      email: 'test@test.com',
      password: '123456',
    });
    expect(res.status).toBe(200);
  });
});

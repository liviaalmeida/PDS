import supertest from 'supertest';

import { createConnection } from 'typeorm';
import { connectionOptions } from '../config';
import app from '../server';
import { truncate } from '../test-utils/helpers';

const testApi = supertest(app);

describe('Authentication flow', () => {
  beforeAll(async () => {
    await createConnection(connectionOptions);
  });

  // afterAll(async () => {
  //   await connection.close();
  // });

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

  it('returns 401 for invalid credentials', async () => {
    await testApi.post('/signup').set('Accept', 'application/json').send({
      email: 'test@test.com',
      password: '123456',
    });

    const res = await testApi.post('/login').set('Accept', 'application/json').send({
      email: 'test@test.com',
      password: '123456789',
    });
    expect(res.status).toBe(401);
  });

  it('returns 404 for non existent user credentials', async () => {
    const res = await testApi.post('/login').set('Accept', 'application/json').send({
      email: 'nada@test.com',
      password: '123456',
    });
    expect(res.status).toBe(404);
  });

  it('returns 400 for invalid payload on login', async () => {
    const res = await testApi.post('/login').set('Accept', 'application/json').send({
      email: 'nada@test.com',
    });
    expect(res.status).toBe(400);
  });

  it('returns 400 for invalid payload on signup', async () => {
    const res = await testApi.post('/signup').set('Accept', 'application/json').send({
      email: 'test@test.com',
    });
    expect(res.status).toBe(400);
  });
});

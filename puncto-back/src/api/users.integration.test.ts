import supertest from 'supertest';

import { createConnection, getConnection } from 'typeorm';
import { connectionOptions } from '../config';
import app from '../server';
import { truncate } from '../test-utils/helpers';

const testApi = supertest(app);

describe('Users API', () => {
  const testUserCredentials = {
    email: 'test@test.com',
    password: '123456',
  }

  async function createTestUser() {
    await testApi.post('/signup').set('Accept', 'application/json').send(testUserCredentials);
  }

  beforeAll(async () => {
    await createConnection(connectionOptions);
    await truncate();
  });

  afterAll(async () => {
    await truncate();
    const conn = await getConnection();
    await conn.close();
  });

  beforeEach(async () => {
    await truncate();
  });

  it('can create new user', async () => {
    const signupRes = await testApi.post('/signup').set('Accept', 'application/json').send({
      email: 'testUser@test.com',
      password: '123456',
    });
    expect(signupRes.status).toBe(201);
  });

  it('can log in', async () => {
    await createTestUser();
    const res = await testApi.post('/login').set('Accept', 'application/json').send(testUserCredentials);
    expect(res.status).toBe(200);
  });

  it('returns 401 for invalid credentials', async () => {
    await createTestUser();

    const res = await testApi.post('/login').set('Accept', 'application/json').send({
      email: 'test@test.com',
      password: 'wrongpassword',
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

  it('can edit personal data', async () => {
    await createTestUser();

    const loginResponse = await testApi.post('/login').set('Accept', 'application/json').send(testUserCredentials);

    const editRes = await testApi.put('/user')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${loginResponse.body.authToken}`)
      .send({
        cnpj: '12.32.12.14/123',
        name: 'novo nome',
        address: 'novo endereco',
        addressTwo: 'endereco 2',
        addressThree: 'endereco 3',
      });

    expect(editRes.status).toBe(200);
  });

  it('returns 400 on invalid payload to edit', async () => {
    await createTestUser();
    const loginResponse = await testApi.post('/login').set('Accept', 'application/json').send(testUserCredentials);

    const editRes = await testApi
      .put('/user')
      .set('Authorization', `Bearer ${loginResponse.body.authToken}`)
      .set('Accept', 'application/json').send({
        email: 'test@test.com',
        password: '123456',
      });

    expect(editRes.status).toBe(400);
  });

  it('returns 401 on non authenticated request', async () => {
    const editRes = await testApi.put('/user').set('Accept', 'application/json').send({
      cnpj: '12.32.12.14/123',
      name: 'novo nome',
      address: 'novo endereco',
    });

    expect(editRes.status).toBe(401);
  });

  it('can get personal data', async () => {
    await createTestUser();

    const loginResponse = await testApi.post('/login').set('Accept', 'application/json').send(testUserCredentials);
    await testApi.put('/user')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${loginResponse.body.authToken}`)
      .send({
        cnpj: '12.32.12.14/123',
        name: 'novo nome',
        address: 'novo endereco',
        addressTwo: 'endereco dois',
        addressThree: 'endereco tres',
      });

    const getRes = await testApi.get('/user')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${loginResponse.body.authToken}`)

    expect(getRes.status).toBe(200);
    expect(getRes.body.name).toBe('novo nome');
  });
});


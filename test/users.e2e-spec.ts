import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import mongoose from 'mongoose';
import { createUserMock } from '../src/mocks/create-user-mock';
import { SigupUserMock } from '../src/mocks/signup-user-mock';
import { decodeToken } from '../utils/decodeToken';

describe('Users & Auth Controller (e2e)', () => {
  let app: INestApplication;
  let tokenLogin = '';
  let userIdRegister = '';
  let userIdCreate = '';
  let userEmailCreate = '';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI);
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('(POST) Register New User in Signup', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(SigupUserMock)
      .expect(201);
    expect(response.body).toBeDefined();
    const tokenResponse = await response.body.token;
    const infoToken = decodeToken(`Bearer ${tokenResponse}`);
    userIdRegister = infoToken.id;
  });

  it('(GET) Login User in Login', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/login')
      .send({ email: SigupUserMock.email, password: SigupUserMock.password })
      .expect(200);
    expect(response.body).toBeDefined();
    tokenLogin = await response.body.token;
  });

  it('(POST) Create User', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${tokenLogin}`)
      .send(createUserMock)
      .expect(201);
    expect(response.body).toBeDefined();
    const responseInfo = await response.body;
    userIdCreate = responseInfo._id;
    userEmailCreate = responseInfo.email;
  });

  it('(GET) Get All Users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${tokenLogin}`)
      .expect(200);
    expect(response.body).toBeDefined();
  });

  it('(GET) Get User By Id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${userIdCreate}`)
      .set('Authorization', `Bearer ${tokenLogin}`)
      .expect(200);
    expect(response.body).toBeDefined();
  });

  it('(GET) Get User By Email', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/email/${userEmailCreate}`)
      .set('Authorization', `Bearer ${tokenLogin}`)
      .expect(200);
    expect(response.body).toBeDefined();
  });

  it('(PUT) Update User', async () => {
    const response = await request(app.getHttpServer())
      .put(`/users/${userIdCreate}`)
      .set('Authorization', `Bearer ${tokenLogin}`)
      .send({
        name: 'Updated Name',
      })
      .expect(200);
    expect(response.body).toBeDefined();
  });

  it('(PATCH) Update Password My User', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/users/update/password`)
      .set('Authorization', `Bearer ${tokenLogin}`)
      .send({
        id: userIdRegister,
        password: '123456',
      })
      .expect(200);
    expect(response.body).toBeDefined();
  });

  it('(PATCH) Update Password Other User', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/users/update/password`)
      .set('Authorization', `Bearer ${tokenLogin}`)
      .send({
        id: userIdCreate,
        password: '123456',
      })
      .expect(200);
    expect(response.body).toBeDefined();
  });

  it('(DELETE) Delete User', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/users/${userIdCreate}`)
      .set('Authorization', `Bearer ${tokenLogin}`)
      .expect(200);
    expect(response.body).toBeDefined();
  });
});

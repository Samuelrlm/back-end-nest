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
  let token = '';
  let userId = '';
  let userEmail = '';
  let updateUserId = '';

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
    token = response.body.token;
    const infoToken = decodeToken(`Bearer ${token}`);
    userId = infoToken.id;
    userEmail = infoToken.email;
  });

  it('(POST) Register New User in Signup', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'Teste',
        email: 'samuca@gmail.com',
        password: '123456',
        permissionLevel: 2,
      })
      .expect(201);
    expect(response.body).toBeDefined();
    token = response.body.token;
    const infoToken = decodeToken(`Bearer ${token}`);
    updateUserId = infoToken.id;
  });

  it('(GET) Login User in Login', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/login')
      .send({ email: SigupUserMock.email, password: SigupUserMock.password })
      .expect(200);
    expect(response.body).toBeDefined();
  });

  it('(GET) Get All Users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body).toBeDefined();
  });

  it('(POST) Create User', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(createUserMock)
      .expect(201);
    expect(response.body).toBeDefined();
  });

  it('(GET) Get User By Id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${updateUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body).toBeDefined();
  });

  it('(GET) Get User By Email', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/email/${userEmail}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body).toBeDefined();
  });

  it('(PUT) Update User', async () => {
    const response = await request(app.getHttpServer())
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Name',
      })
      .expect(200);
    expect(response.body).toBeDefined();
  });

  it('(PATCH) Update Password My User', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/users/update/password`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: userId,
        password: '123456',
      })
      .expect(200);
    expect(response.body).toBeDefined();
  });

  it('(PATCH) Update Password Other User', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/users/update/password`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: updateUserId,
        password: '123456',
      })
      .expect(200);
    expect(response.body).toBeDefined();
  });

  it('(DELETE) Delete User', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body).toBeDefined();
  });
});

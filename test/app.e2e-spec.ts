import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import mongoose from 'mongoose';
import { createUserMock } from '../src/mocks/create-user-mock';
import { SigupUserMock } from '../src/mocks/signup-user-mock';

describe('Users & Auth Controller (e2e)', () => {
  let app: INestApplication;
  let token = '';

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

  it('(POST) Create New User', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(createUserMock)
      .expect(201);
    expect(response.body).toBeDefined();
  });
});

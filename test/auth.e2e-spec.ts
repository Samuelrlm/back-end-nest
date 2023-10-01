import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import mongoose from 'mongoose';
import { decodeToken } from '../utils/decodeToken';

describe('Users & Auth Controller (e2e)', () => {
  let app: INestApplication;
  let tokenFirstUser = '';
  let firstUserEmail = '';

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
      .send({
        name: 'Teste',
        email: 'sucolento@gmail.com',
        password: '123456',
        permissionLevel: 2,
      })
      .expect(201);
    expect(response.body).toBeDefined();
    tokenFirstUser = response.body.token;
    const infoToken = decodeToken(`Bearer ${tokenFirstUser}`);
    firstUserEmail = infoToken.email;
  });

  it('(GET) Get Login User', async () => {
    const response = await request(app.getHttpServer())
      .get(`/auth/login`)
      .send({
        email: firstUserEmail,
        password: '123456',
      })
      .expect(200);
    expect(response.body).toBeDefined();
  });
});

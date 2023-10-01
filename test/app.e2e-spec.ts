import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { userMock } from '../src/mocks/user-mock';
import mongoose from 'mongoose';

describe('Users & Auth Controller (e2e)', () => {
  let app: INestApplication;
  const uriDb = 'mongodb://localhost:27017/users-db-test';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    await mongoose.connect(uriDb);
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('(POST) Register New User in Signup', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(userMock)
      .expect(201);
    expect(response.body).toBeDefined();
  });
});

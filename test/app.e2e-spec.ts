import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GraphQL)', () => {
    const query = `query {
        getAllMakes {
          makeId,
          makeName
        }
      }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({query})
      .expect(200)
      .expect(res => {
        expect(res.body.data.getAllMakes.length).toEqual(11350)
      });
  });

  afterAll(() => {
    app.close();
  })
});

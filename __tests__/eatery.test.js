const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');




describe('RESTfull route testing zone', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.skip('example test - delete me!', () => {
    expect(1).toEqual(1);
  });
  afterAll(() => {
    pool.end();
  });
});

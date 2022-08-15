const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');




describe('RESTfull route testing zone', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.skip('get all eateries from table', async () => {
    const res = await request(app).get('/restaurant');
    // eslint-disable-next-line
        const expected = [{
      id: '1',
      name: 'Taco Bell',
      city: 'Portland',
      address: '123 Gassy Lane'
    },
    {
      id: '2',
      name: 'McDonalds',
      city: 'Gresham',
      address: '456 McHappy St'
    }];

    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: '3',
      name: 'Wendys',
      city: 'Oswego',
      address: '789 Distastefull Rd'
    });
  });
  afterAll(() => {
    pool.end();
  });
});

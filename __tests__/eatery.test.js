const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');




describe('RESTfull route testing zone', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('get all eateries from table', async () => {
    const res = await request(app).get('/api/v1/restaurants');

    expect(res.status).toBe(200);
    expect(res.body[2]).toEqual({
      id: '3',
      name: 'Wendys',
      city: 'Oswego',
      address: '789 Distastefull Rd',
      review: expect.any(Array)
    });
    
  });
  it('get a Restaurant from #get/:id', async () => {
    const resp = await request(app).get('/api/v1/restaurants/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '1',
      name: expect.any(String),
      city: expect.any(String),
      address: expect.any(String),
      review: expect.any(Array)

    });
  });

  it('POST should insert a new review into reviews table', async () => {
    const newReview = {
  
      review: 'this is awesome',
    };
    const resp = await request(app).post('/api/v1/restaurants/1').send(newReview);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newReview,
      review: expect(resp.body.review).toBe('this is awesome')
    });
  });


  afterAll(() => {
    pool.end();
  });
});

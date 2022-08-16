const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  firstName: 'Charlie',
  lastName: 'Brown',
  email: 'peanuts@gang.com',
  password: '12345',
};

const login = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;


  const agent = request.agent(app);


  const [user] = await UserService.create({ ...mockUser, ...userProps });


  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

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
    const [agent, user] = await login();
    
    const newReview = {
  
      review: 'this is awesome',
    };
    const resp = await agent.post('/api/v1/restaurants/1/reviews').send(newReview);
    
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newReview,
      user_id: user.id,
      eatery_id: '1',
    });
  });


  afterAll(() => {
    pool.end();
  });
});

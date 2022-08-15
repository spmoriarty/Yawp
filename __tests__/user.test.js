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


  const user = await UserService.create({ ...mockUser, ...userProps });


  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};



describe('RESTfull route testing zone', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { firstName, lastName, email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });


  it('should return a list of users if signed in as admin', async () => {
    const [agent] = await login({ email: 'admin' });
    const res = await agent.get('/api/v1/users');

    // expect(res.body).toEqual([{ ...user }]);
    expect(res.body).toEqual(expect.arrayContaining([{
      id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      
    }]));
  });
  // new test here


  it('returns the current user', async () => {
    const [agent, user] = await login();
    const me = await agent.get('/api/v1/users/me');

    expect(me.body).toEqual({
      ...user,
      exp: expect.any(Number),
      iat: expect.any(Number),
    });
  });
});

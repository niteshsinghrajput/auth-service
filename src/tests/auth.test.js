const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index'); // export app from index.js instead of app.listen

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth Service', () => {
  let token;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'testuser@example.com',
        password: 'Test1234',
        role: 'student',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe('testuser@example.com');
  });

  it('should login user and return token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'Test1234',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    token = res.body.data.token;
  });

  it('should access protected route with valid token', async () => {
    const res = await request(app)
      .get('/api/auth/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.message).toBe('You have accessed a protected route!');
  });

  it('should fail protected route without token', async () => {
    const res = await request(app).get('/api/auth/protected');
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBeDefined(); // ✅ updated from 'error' to 'message'
    expect(res.body.message).toBe('Authorization token is missing'); // optional additional check
  });
});

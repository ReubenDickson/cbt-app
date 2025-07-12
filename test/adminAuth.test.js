import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import app from '../app.js';
import Admin from '../models/Admin.js';

describe('Admin Auth Endpoints (ESM)', () => {
  const testAdmin = {
    name: 'Test Admin',
    staffId: 'ADM-2025001',
    email: 'admin@test.com',
    password: 'adminpass123',
  };

  before(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  after(async () => {
    await mongoose.connection.db.dropDatabase(); // clean test DB
    await mongoose.disconnect();
  });

  it('should register an admin successfully', async () => {
    const res = await request(app)
      .post('/api/admin/register')
      .send(testAdmin);

    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal('Admin registered successfully');
  });

  it('should login the admin successfully', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({
        staffId: testAdmin.staffId,
        password: testAdmin.password,
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    expect(res.body.admin.email).to.equal(testAdmin.email);
  });

  it('should fail login with incorrect password', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({
        staffId: testAdmin.staffId,
        password: 'wrongpassword',
      });

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Invalid credentials');
  });
});
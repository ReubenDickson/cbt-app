import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import app from '../app.js';
import Student from '../models/Student.js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

describe('Student Auth Enpoints', () => {
    const testStudent = {
        name: 'Test Student',
        matricNumber: 'TST2025001',
        email: 'test@student.com',
        password: 'secure123',
    };

    before(async function () {
        this.timeout(15000); // Increase timeout for database connection
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URL not defined");
        }

        await mongoose.connect(process.env.MONGO_URI);
    });

    after(async () => {
        await mongoose.connection.db.dropDatabase(); // Clean up test database
        await mongoose.disconnect();
    });

    it('should register a new student succefully', async () => {
        const res = await request(app).post('/api/auth/register').send(testStudent);

        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Student registered successfully.');
    });

    it('should not register a student with existing matric number', async () => {
        const res = await request(app).post('/api/auth/register').send(testStudent);

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Matriculation number already exists!');
    });

    it('should login a student successfully', async () => {
        const res = await request(app).post('/api/auth/login').send({
            matricNumber: testStudent.matricNumber,
            password: testStudent.password,
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('token');
        expect(res.body.student.email).to.equal(testStudent.email);
    });

    it('should fail to login with incorerect credentials', async () => {
        const res = await request(app).post('/api/auth/login').send({
            matricNumber: testStudent.matricNumber,
            password: 'wrongpassword',
        });

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Invalid credentials!');
    });
});
import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import app from '../app.js';
import Exam from '../models/Exam.js';
import Student from '../models/Student.js';
import Question from '../models/Question.js';

describe('Student Exam Workflow', () => {
    let studentToken;
    let id;
    let createQuestions = [];

    const student = {
        name: "Flow Tester",
        matricNumber: "FLOW2025001",
        email: "flow@test.com",
        password: "flowpass",
    };

    before(async () => {
        await mongoose.connect(process.env.MONGO_URI);
        
        //Register student
        await request(app).post("/api/auth/register").send(student);
        const loginRes = await request(app)
        .post("/api/auth/login")
        .send({
            matricNumber: student.matricNumber,
            password: student.password,
        });
        studentToken = loginRes.body.token;

        // Create sample questions
        const q1 = await Question.create({
            courseCode: "CSC101",
            questionText: "What is JavaScript?",
            options: ["A programming language", "A type of coffee", "A database", "A web server"],
            correctAnswer: "A programming language",
        });

        const q2 = await Question.create({
            courseCode: "CS101",
            questionText: "What is Node.js?",
            options: ["A JavaScript runtime", "A CSS framework", "A database", "A web server"],
            correctAnswer: "A JavaScript runtime",
        });

        createQuestions.push(q1, q2);

        // Create an exam for today
        const today = new Date();
        const now = new Date();
        const startTime = new Date(now.setMinutes(now.getMinutes() + 1)); // Set start time to 1 minute from now
        const endTime = new Date(now.setMinutes(now.getMinutes() + 3)); // Set end time to 3 minutes from now
        const exam = await Exam.create({
            title: "Intro to CSC",
            courseCode: "CSC101",
            date: today,
            duration: 30,
            questions: [q1._id, q2._id],
            startTime,
            endTime,
        });

        id = exam._id;
    });

    after(async () => {
        await mongoose.connection.db.dropDatabase(); // Clean up the database after tests
        await mongoose.disconnect();
    });

    it("Should return today's exams", async () => {
        const res = await request(app)
        .get("/api/student-exams/today")
        .set("Authorization", `Bearer ${studentToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array').that.is.not.empty;
    expect(res.body[0]).to.have.property("title", "Intro to CSC");
    });

    // it("Should start the exam and receive questions", async () => {
    //    const res = await request(app)
    //    .post(`/api/student-exams/${id}/start`)
    //    .set("Authorization", `Bearer ${studentToken}`);

    //    expect(res.status).to.equal(200);
    //    expect(res.body.exam.questions).to.have.length(2);
    //    expect(res.body.exam.courseCode).to.equal("CSC101");
    //    expect(res.body).to.have.property("sessionId");
    //});

    //it("should submit exam and receive a score", async () => {
     //   const answers = createQuestions.map((q) => ({
     //       questionId: q._id.toString(),
     //       selectedOption: q.correctAnswer,
     //   }));

     //   const res = await request(app)
     //   .post(`/api/student-exams/${id}/submit`)
     //   .set("Authorization", `Bearer ${studentToken}`)
     //   .send({ answers });

   // expect(res.status).to.equal(200);
   // expect(res.body).to.have.property("score", 2);
   // expect(res.body).to.have.property("total", 2);
   // expect(res.body.message).to.equal("Exam submitted successfully");
   // });
});
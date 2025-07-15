import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export const sendResultEmail = async (toString, studentName, courseTitle, score, total) => {
    const subject = `Exam Results for ${courseTitle}`;
    const html = `
        <h1>Exam Results</h1>
        <p>Dear ${studentName},</p>
        <p>Your exam results for the course <strong>${courseTitle}</strong> are as follows:</p>
        <p><strong>Score:</strong> ${score} / ${total}</p>
        <p>Thank you for participating!</p>
    `;
    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: toString,
        subject,
        html,
    });
};
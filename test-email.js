require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '465'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: `"Test Calefones" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Send to self
            subject: "Test Email from Calefones Loja",
            text: "This is a test email to verify the SMTP configuration.",
            html: "<b>This is a test email to verify the SMTP configuration.</b>",
        });

        console.log("Email sent successfully!");
        console.log("Message ID:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

testEmail();

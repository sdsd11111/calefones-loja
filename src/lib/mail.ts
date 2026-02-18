import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '465'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
    const info = await transporter.sendMail({
        from: `"Calefones Loja" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html,
    });

    return info;
};

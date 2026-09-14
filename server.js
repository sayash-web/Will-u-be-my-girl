require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'tzvctfbhzoahdmem@ethereal.email',
        pass: 'yJuqq8t2S9xTR4KFWw'
    }
});

app.post('/api/said-yes', async (req, res) => {
    const targetEmail = 'yashgaur1012@gmail.com';

    const mailOptions = {
        from: '"Proposal Alert ❤️" <proposal@sayon.love>',
        to: targetEmail,
        subject: '🎉 SAYON SAID YES! ❤️',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fff0f5; border-radius: 12px; border: 2px solid #ff4b6e; max-width: 500px;">
                <h1 style="color: #d63384; text-align: center;">🎉 SAYON SAID YES! ❤️</h1>
                <p style="font-size: 16px; color: #333;">Great news! Sayon clicked <strong>YES</strong> on your proposal website!</p>
                <p style="font-size: 14px; color: #666; margin-top: 20px;">Time of confirmation: <strong>${new Date().toLocaleString()}</strong></p>
                <div style="text-align: center; margin-top: 25px; font-size: 24px;">
                    💖 💕 💗
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log("💌 Email dispatched! View delivered email live at:", previewUrl);
        res.json({ success: true, message: "Email sent!", previewUrl: previewUrl });
    } catch (error) {
        console.error("❌ Email error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`❤️ Backend proposal server running at http://localhost:${PORT}`);
});

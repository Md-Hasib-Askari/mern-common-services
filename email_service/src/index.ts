import express, { Request, Response } from 'express';

import { sendEmail } from './utils/email';
import OtpService from './utils/otp';

const app = express();

// routes
app.post('/send-otp', (req: Request, res: Response) => {
    const { email } = req.body;
    const otp = OtpService.generateOTP(email);

    try {
        sendEmail(email, 'Your OTP Code', `Your OTP code is ${otp}`);
        res.status(200).json({ message: 'OTP sent successfully' });
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }

});

app.post('/verify-otp', (req: Request, res: Response) => {
    const { email, otp } = req.body;
    const isValid = OtpService.verifyOTP(email, otp);

    if (isValid) {
        res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid or expired OTP' });
    }
});
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Otp from '@/models/Otp';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email } = await request.json();
    const adminEmail = process.env.Email;
    
    if (email !== adminEmail) {
      return NextResponse.json({ success: false, message: 'Unauthorized email' }, { status: 401 });
    }

    await dbConnect();
    
    // Generate 6 digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save to DB (replaces any existing OTP for this email)
    await Otp.deleteMany({ email });
    await Otp.create({ email, otp: otpCode });
    
    // Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.Email,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.Email,
      to: email,
      subject: 'Your Admin Login OTP',
      text: `Your one-time password for the Admin Dashboard is: ${otpCode}. It is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('OTP Send Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

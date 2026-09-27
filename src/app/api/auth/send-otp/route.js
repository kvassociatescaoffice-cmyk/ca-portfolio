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
      subject: 'Your Admin Login OTP - Kumar Vashishtha & Associates',
      text: `Your one-time password for the Admin Dashboard is: ${otpCode}. It is valid for 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #0f172a; margin: 0;">Admin Login Verification</h2>
            <p style="color: #64748b; font-size: 14px;">Kumar Vashishtha & Associates</p>
          </div>
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <p style="font-size: 16px; color: #334155; margin-bottom: 20px;">Here is your One-Time Password (OTP) to securely log in to the admin dashboard.</p>
            
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; display: inline-block; margin-bottom: 20px;">
              <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #0f172a;">${otpCode}</span>
            </div>
            
            <p style="font-size: 14px; color: #64748b;">Double-click the code above and press Ctrl+C (or Cmd+C) to copy it.</p>
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <p style="font-size: 12px; color: #94a3b8;">This code is valid for 5 minutes. If you did not request this code, please ignore this email.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('OTP Send Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

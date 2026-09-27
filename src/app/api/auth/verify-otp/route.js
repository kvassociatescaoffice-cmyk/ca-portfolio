import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Otp from '@/models/Otp';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';

export async function POST(request) {
  try {
    const { email, otp } = await request.json();
    const adminEmail = process.env.Email;
    
    if (email !== adminEmail) {
      return NextResponse.json({ success: false, message: 'Unauthorized email' }, { status: 401 });
    }

    await dbConnect();
    
    // Find the OTP
    const validOtp = await Otp.findOne({ email, otp });
    
    if (!validOtp) {
      return NextResponse.json({ success: false, message: 'Invalid or expired OTP' }, { status: 400 });
    }
    
    // OTP is valid, create JWT token
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
    
    // Delete OTP so it cannot be reused
    await Otp.deleteOne({ _id: validOtp._id });
    
    // Set cookie
    const response = NextResponse.json({ success: true, message: 'Login successful' });
    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('OTP Verify Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';

export function verifyAdminToken(request) {
  const token = request.cookies.get('admin_token')?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.email === process.env.Email) {
      return decoded;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export function unauthorizedResponse() {
  return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}

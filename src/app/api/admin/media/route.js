import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Media from '@/models/Media';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/authMiddleware';

export async function GET(request) {
  const admin = verifyAdminToken(request);
  if (!admin) return unauthorizedResponse();

  try {
    await dbConnect();
    const mediaList = await Media.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: mediaList });
  } catch (error) {
    console.error('Fetch Media Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

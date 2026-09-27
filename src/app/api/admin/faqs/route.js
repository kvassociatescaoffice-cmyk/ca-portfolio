import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Faq from '@/models/Faq';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/authMiddleware';

export async function GET(request) {
  await dbConnect();
  
  // Public vs Admin check
  const admin = verifyAdminToken(request);
  const query = admin ? {} : { isPublished: true };

  try {
    const faqs = await Faq.find(query).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: faqs });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  const admin = verifyAdminToken(request);
  if (!admin) return unauthorizedResponse();

  try {
    await dbConnect();
    const data = await request.json();
    const faq = await Faq.create(data);
    return NextResponse.json({ success: true, data: faq });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/authMiddleware';

export async function GET(request) {
  const admin = verifyAdminToken(request);
  if (!admin) return unauthorizedResponse();

  await dbConnect();
  
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const search = searchParams.get('search') || '';
  
  const query = search 
    ? { 
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ] 
      }
    : {};

  try {
    const skip = (page - 1) * limit;
    const [contacts, total] = await Promise.all([
      Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Contact.countDocuments(query)
    ]);
    
    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Fetch Contacts Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

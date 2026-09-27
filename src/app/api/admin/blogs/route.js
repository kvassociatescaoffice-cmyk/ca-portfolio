import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/authMiddleware';

export async function GET(request) {
  await dbConnect();
  
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const search = searchParams.get('search') || '';
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  
  // Public vs Admin check
  const admin = verifyAdminToken(request);
  let query = admin ? {} : { isPublished: true };

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }
  
  if (year) {
    const startDate = new Date(parseInt(year), month ? parseInt(month) - 1 : 0, 1);
    const endDate = new Date(parseInt(year), month ? parseInt(month) : 12, 1);
    query.createdAt = { $gte: startDate, $lt: endDate };
  }

  try {
    const skip = (page - 1) * limit;
    const [blogs, total] = await Promise.all([
      Blog.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Blog.countDocuments(query)
    ]);
    
    return NextResponse.json({
      success: true,
      data: blogs,
      pagination: { total, page, pages: Math.ceil(total / limit) }
    });
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
    const blog = await Blog.create(data);
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('Create Blog Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

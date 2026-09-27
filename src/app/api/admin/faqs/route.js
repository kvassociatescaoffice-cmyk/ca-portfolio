import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Faq from '@/models/Faq';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/authMiddleware';

export async function GET(request) {
  await dbConnect();
  
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const search = searchParams.get('search') || '';

  const admin = verifyAdminToken(request);
  let query = admin ? {} : { isPublished: true };

  if (search) {
    query.question = { $regex: search, $options: 'i' };
  }

  try {
    // If limit is 0 or large, fetch all (for homepage which might not pass limit or needs all)
    // Actually, homepage calls this without query params, so it defaults to limit=10.
    // Let's allow limit=0 to mean no limit.
    const skip = (page - 1) * limit;
    
    let faqsQuery = Faq.find(query).sort({ order: 1, createdAt: -1 });
    if (limit > 0) {
      faqsQuery = faqsQuery.skip(skip).limit(limit);
    }
    
    const [faqs, total] = await Promise.all([
      faqsQuery.lean(),
      Faq.countDocuments(query)
    ]);
    
    return NextResponse.json({ 
      success: true, 
      data: faqs,
      pagination: { total, page, pages: limit > 0 ? Math.ceil(total / limit) : 1 }
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
    const faq = await Faq.create(data);
    return NextResponse.json({ success: true, data: faq });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const admin = verifyAdminToken(request);
  if (!admin) return unauthorizedResponse();

  try {
    await dbConnect();
    const data = await request.json();
    const { _id, ...updateData } = data;
    const faq = await Faq.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({ success: true, data: faq });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const admin = verifyAdminToken(request);
  if (!admin) return unauthorizedResponse();

  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await Faq.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

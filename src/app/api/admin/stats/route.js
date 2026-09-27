import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import Blog from '@/models/Blog';
import Faq from '@/models/Faq';
import News from '@/models/News';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/authMiddleware';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const admin = verifyAdminToken(request);
  if (!admin) return unauthorizedResponse();

  try {
    await dbConnect();
    
    const [leads, blogs, faqs, news] = await Promise.all([
      Contact.countDocuments(),
      Blog.countDocuments(),
      Faq.countDocuments(),
      News.countDocuments()
    ]);

    // Get 5 most recent leads for the activity feed
    const recentLeads = await Contact.find().sort({ createdAt: -1 }).limit(5).lean();
    
    return NextResponse.json({
      success: true,
      data: {
        counts: { leads, blogs, faqs, news },
        recentActivity: recentLeads
      }
    });
  } catch (error) {
    console.error('Fetch Stats Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

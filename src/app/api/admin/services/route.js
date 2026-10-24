import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/authMiddleware';
import { getAllServicesFlat, categoriesData } from '@/lib/servicesData';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const dbServices = await Service.find({ isPublished: true }).lean();
    const staticServices = getAllServicesFlat();

    let allServices = [
      ...staticServices.map(s => ({ ...s, isStatic: true })),
      ...dbServices.map(s => ({
        title: s.title,
        slug: s.slug,
        category: s.category || 'others',
        categorySlug: s.category || 'others',
        categoryName: categoriesData[s.category]?.name || 'Other Professional Services',
        categoryShort: categoriesData[s.category]?.shortTitle || 'Other Services',
        description: s.description,
        details: s.details,
        features: s.features || [],
        isCustom: true,
        _id: s._id
      }))
    ];

    if (category && category !== 'all') {
      allServices = allServices.filter(s => 
        (s.categorySlug && s.categorySlug.toLowerCase() === category.toLowerCase()) ||
        (s.category && s.category.toLowerCase() === category.toLowerCase())
      );
    }

    if (search) {
      const q = search.toLowerCase();
      allServices = allServices.filter(s => 
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, data: allServices });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const admin = verifyAdminToken(request);
  if (!admin) return unauthorizedResponse();

  try {
    await dbConnect();
    const data = await request.json();

    if (!data.title || !data.description) {
      return NextResponse.json({ success: false, message: 'Title and description are required' }, { status: 400 });
    }

    // Default if category not match or empty: give in 'others'
    let category = data.category ? data.category.toLowerCase().trim() : 'others';
    if (!categoriesData[category]) {
      // Check if it matches any category name/shortTitle
      const match = Object.values(categoriesData).find(
        c => c.name.toLowerCase() === category || c.shortTitle.toLowerCase() === category || c.slug.toLowerCase() === category
      );
      category = match ? match.slug : 'others';
    }

    const slug = data.slug ? slugify(data.slug) : slugify(data.title);

    const service = await Service.create({
      title: data.title,
      slug,
      category,
      description: data.description,
      details: data.details || data.description,
      features: data.features || [],
      order: data.order || 0,
      isPublished: data.isPublished !== false
    });

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

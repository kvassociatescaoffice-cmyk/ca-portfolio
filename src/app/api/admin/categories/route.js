import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/authMiddleware';
import { categoriesList } from '@/lib/servicesData';

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
    const dbCategories = await Category.find({}).sort({ order: 1, createdAt: 1 }).lean();

    // Map system categories
    const systemSlugs = new Set(categoriesList.map(c => c.slug));
    
    // Combine system categories and DB custom categories
    const allCategories = [...categoriesList];
    for (const cat of dbCategories) {
      if (!systemSlugs.has(cat.slug)) {
        allCategories.push({
          slug: cat.slug,
          name: cat.name,
          shortTitle: cat.shortTitle || cat.name,
          badge: cat.badge || 'Custom Category',
          icon: cat.icon || 'Briefcase',
          color: cat.color || '#0d1d3a',
          accent: cat.accent || '#f0663f',
          description: cat.description || '',
          services: [],
          experience: [],
          caseStudies: [],
          isCustom: true,
          _id: cat._id
        });
      }
    }

    return NextResponse.json({ success: true, data: allCategories });
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
    
    if (!data.name) {
      return NextResponse.json({ success: false, message: 'Category name is required' }, { status: 400 });
    }

    const slug = data.slug ? slugify(data.slug) : slugify(data.name);
    
    // Check if slug exists in system categories
    const isSystem = categoriesList.some(c => c.slug === slug);
    if (isSystem) {
      return NextResponse.json({ success: false, message: 'This category already exists as a primary category' }, { status: 400 });
    }

    const existing = await Category.findOne({ slug });
    if (existing) {
      return NextResponse.json({ success: false, message: 'Category slug already exists' }, { status: 400 });
    }

    const newCategory = await Category.create({
      name: data.name,
      slug,
      shortTitle: data.shortTitle || data.name,
      badge: data.badge || 'Specialized Advisory',
      icon: data.icon || 'Briefcase',
      description: data.description || '',
      color: data.color || '#0d1d3a',
      accent: data.accent || '#f0663f',
      order: data.order || 0,
      isCustom: true
    });

    return NextResponse.json({ success: true, data: newCategory });
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
    const slug = searchParams.get('slug');

    let query = {};
    if (id) query._id = id;
    else if (slug) query.slug = slug;
    else return NextResponse.json({ success: false, message: 'ID or slug required' }, { status: 400 });

    const deleted = await Category.findOneAndDelete(query);
    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Category not found or cannot delete system categories' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

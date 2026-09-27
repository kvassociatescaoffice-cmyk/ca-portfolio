import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

import Notification from '@/models/Notification';

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.email) {
      return NextResponse.json({ success: false, message: 'Name and email are required.' }, { status: 400 });
    }

    // Save lead
    const newContact = await Contact.create({
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      subject: body.subject || 'General Inquiry',
      message: body.message || '',
      status: 'new'
    });

    // Create Notification
    await Notification.create({
      title: 'New Lead Received',
      message: `${body.name} submitted a new inquiry.`,
      type: 'lead'
    });

    return NextResponse.json({ success: true, data: newContact }, { status: 201 });
  } catch (error) {
    console.error('Contact Submission Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit contact form.' }, { status: 500 });
  }
}

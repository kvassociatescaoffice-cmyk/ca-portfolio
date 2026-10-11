import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

import Notification from '@/models/Notification';

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ success: false, message: 'Name, email, and message are required.' }, { status: 400 });
    }

    const topic = body.service || body.subject || 'General Inquiry';

    // Save lead
    const newContact = await Contact.create({
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      service: topic,
      subject: topic,
      message: body.message,
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
    return NextResponse.json({ success: false, message: error.message || 'Failed to submit contact form.' }, { status: 500 });
  }
}

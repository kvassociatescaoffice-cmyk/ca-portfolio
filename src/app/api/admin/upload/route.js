import { NextResponse } from 'next/server';
import { uploadFileToDrive } from '@/lib/drive';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/authMiddleware';
import dbConnect from '@/lib/mongodb';
import Media from '@/models/Media';

export async function POST(request) {
  const admin = verifyAdminToken(request);
  if (!admin) return unauthorizedResponse();

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // We can use the folder ID if the user provided it, else it goes to the root
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID || null;

    const result = await uploadFileToDrive(buffer, file.name, file.type, folderId);

    if (!result.success) {
      throw new Error(result.error);
    }

    // Save to database for gallery listing
    await dbConnect();
    const mediaDoc = await Media.create({
      url: result.url,
      driveId: result.id,
      name: file.name
    });

    return NextResponse.json({ success: true, url: result.url, media: mediaDoc });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to upload image' }, { status: 500 });
  }
}

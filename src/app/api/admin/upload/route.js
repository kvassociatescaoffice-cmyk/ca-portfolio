import { NextResponse } from 'next/server';
import { uploadFileToDrive } from '@/lib/drive';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/authMiddleware';

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

    return NextResponse.json({ success: true, url: result.url });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to upload image' }, { status: 500 });
  }
}

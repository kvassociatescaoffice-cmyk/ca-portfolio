import { google } from 'googleapis';
import stream from 'stream';

// Configure Google Drive Auth
const getDriveService = () => {
  const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    // Fix private key formatting for Next.js environments
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });

  return google.drive({ version: 'v3', auth });
};

export const uploadFileToDrive = async (fileBuffer, fileName, mimeType, folderId) => {
  try {
    const drive = getDriveService();
    
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);

    const fileMetadata = {
      name: fileName,
      // If the user hasn't provided a folder ID yet, we'll just upload to the root of the service account
      // but it's best to specify the folder shared with them.
      ...(folderId && { parents: [folderId] })
    };

    const media = {
      mimeType,
      body: bufferStream,
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: 'id, webViewLink, webContentLink',
    });

    // Make the file publicly accessible so it can be viewed on the website
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // We can use the Google Drive direct download link format for images
    const directUrl = `https://drive.google.com/uc?export=view&id=${response.data.id}`;

    return {
      success: true,
      id: response.data.id,
      url: directUrl,
    };
  } catch (error) {
    console.error('Google Drive Upload Error:', error);
    return { success: false, error: error.message };
  }
};

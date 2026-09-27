import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  driveId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.models.Media || mongoose.model('Media', MediaSchema);

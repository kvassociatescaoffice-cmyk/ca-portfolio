import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  sourceUrl: { type: String, required: false },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

NewsSchema.index({ title: 'text', content: 'text' });

export default mongoose.models.News || mongoose.model('News', NewsSchema);

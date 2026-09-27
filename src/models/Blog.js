import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true }, // HTML or Markdown
  coverImage: { type: String, required: false },
  tags: [{ type: String }],
  isPublished: { type: Boolean, default: false },
  seoTitle: { type: String },
  seoDescription: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

BlogSchema.index({ title: 'text', content: 'text', tags: 'text' });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

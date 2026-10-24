import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortTitle: { type: String },
  badge: { type: String, default: 'Professional Services' },
  icon: { type: String, default: 'Briefcase' },
  color: { type: String, default: '#0d1d3a' },
  accent: { type: String, default: '#f0663f' },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isCustom: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

CategorySchema.index({ name: 'text', description: 'text' });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);

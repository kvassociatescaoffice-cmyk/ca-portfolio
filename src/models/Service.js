import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: String, default: 'others' }, // Category slug or name, defaults to 'others'
  description: { type: String, required: true },
  details: { type: String },
  features: [{ type: String }],
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ServiceSchema.index({ title: 'text', description: 'text', category: 'text' });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);

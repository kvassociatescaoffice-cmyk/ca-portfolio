import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  service: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'contacted', 'resolved'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

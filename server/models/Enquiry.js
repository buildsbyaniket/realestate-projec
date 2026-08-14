import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // could be a client or user
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'resolved'], default: 'new' },
    createdAt: { type: Date, default: Date.now },
    respondedAt: { type: Date },
    response: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Enquiry', EnquirySchema);

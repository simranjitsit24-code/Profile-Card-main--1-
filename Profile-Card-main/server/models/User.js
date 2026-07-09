import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, default: '' },
  bio: { type: String, required: true },
  imageUrl: { type: String, default: '' }, // will store the file path
  phoneNumber: { type: String, default: '' },
  email: { type: String, default: '' },
  bloodGroup: { type: String, default: '' },
  address: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
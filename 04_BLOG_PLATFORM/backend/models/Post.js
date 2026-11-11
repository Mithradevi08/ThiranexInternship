import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a post title'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Please provide post content']
  },
  category: {
    type: String,
    default: 'Tech & Development'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Post', postSchema);

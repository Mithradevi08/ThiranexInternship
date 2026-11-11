import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  authorName: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Please provide comment text'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Comment', commentSchema);

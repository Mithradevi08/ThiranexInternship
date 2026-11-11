import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a task title'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  category: {
    type: String,
    trim: true,
    default: 'General'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  },
  dueDate: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Task', taskSchema);

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import Post from './models/Post.js';
import User from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Auto seed initial posts if empty
const seedInitialBlogPosts = async () => {
  try {
    const postCount = await Post.countDocuments();
    if (postCount === 0) {
      // Find or create default author
      let author = await User.findOne({ email: 'mithradevi@kongu.edu' });
      if (!author) {
        author = await User.create({
          name: 'Mithradevi Rajalingam',
          email: 'mithradevi@kongu.edu',
          password: 'Password@123'
        });
      }

      await Post.insertMany([
        {
          title: 'Getting Started with Full Stack MERN Development in 2026',
          content: 'Building modern web applications requires a robust stack that seamlessly bridges the front and back ends. MongoDB, Express, React, and Node.js (MERN) have established themselves as the industry standard for agile, JavaScript-unified software architecture. In this article, we examine best practices for state management, RESTful API design, and MongoDB Atlas indexing.',
          category: 'Web Development',
          author: author._id,
          authorName: author.name
        },
        {
          title: 'Exploring Practical Artificial Intelligence & Computer Vision',
          content: 'Artificial Intelligence and computer vision are reshaping industries from precision agriculture to automated healthcare diagnostics. Combining edge IoT devices with deep learning architectures allows real-time inference without cloud latency bottlenecks. As engineering students, mastering these fundamentals opens endless possibilities for high-impact engineering.',
          category: 'Artificial Intelligence',
          author: author._id,
          authorName: author.name
        }
      ]);
      console.log('✅ [Blog Backend] Initial blog posts seeded into MongoDB Atlas');
    }
  } catch (err) {
    console.error('Error auto-seeding blog posts:', err.message);
  }
};

// Connect Database
connectDB().then(() => {
  seedInitialBlogPosts();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Thiranex Blog Platform API',
    database: 'MongoDB Atlas Connected',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.send('Thiranex Blog Platform API is running. Access /api/health for system status.');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 [Blog Backend] Server running on http://localhost:${PORT}`);
});

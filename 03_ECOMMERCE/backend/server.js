import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { seedDatabaseIfEmpty } from './data/seedProducts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect Database & auto-seed products if empty
connectDB().then(() => {
  seedDatabaseIfEmpty();
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Thiranex E-Commerce API',
    database: 'MongoDB Atlas Connected',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.send('Thiranex E-Commerce API is running. Access /api/health for system status.');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 [Ecommerce Backend] Server running on http://localhost:${PORT}`);
});

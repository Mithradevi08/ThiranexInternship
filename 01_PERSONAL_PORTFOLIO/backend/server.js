import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, isConnectedToMongo } from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect Database
connectDB();

// API Routes
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Mithradevi Rajalingam - Portfolio API',
    database: isConnectedToMongo ? 'MongoDB Atlas Connected' : 'In-Memory Active Fallback',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Mithradevi Rajalingam Portfolio API is running. Access /api/health for system status.');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 [Portfolio Backend] Server running on http://localhost:${PORT}`);
});

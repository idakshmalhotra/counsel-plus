// server.js
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import { User } from './models/user.model.js';


dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'https://plus.d29w8hj3me53fe.amplifyapp.com',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

 
// API Routes
// Get dashboard statistics
app.get('/api/admin/stats', async (req, res) => {
  try {
    const totalSubmissions = await User.countDocuments();
    const acceptedCandidates = await User.countDocuments({ adminStatus: 'accepted' });
    const rejectedCandidates = await User.countDocuments({ adminStatus: 'rejected' });
    const candidatesForReview = await User.countDocuments({ 
      adminStatus: { $in: ['pending', 'under_review'] } 
    });

    res.json({
      totalSubmissions,
      acceptedCandidates,
      rejectedCandidates,
      candidatesForReview
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all candidates with search
app.get('/api/admin/candidates', async (req, res) => {
  try {
    const { search = '', page = 1, limit = 20 } = req.query;
    
    let query = {};
    if (search) {
      query = {
        $or: [
          { jeeRollNo: { $regex: search, $options: 'i' } },
          { name: { $regex: search, $options: 'i' } },
          { jeeRank: parseInt(search) || 0 }
        ]
      };
    }

    const candidates = await User.find(query)
      .select('name jeeRollNo jeeRank adminStatus paymentStatus submittedAt')
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      candidates,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get specific candidate details
app.get('/api/admin/candidate/:id', async (req, res) => {
  try {
    const candidate = await User.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (error) {
    console.error('Error fetching candidate:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update candidate admin status
app.put('/api/admin/candidate/:id/status', async (req, res) => {
  try {
    const { adminStatus, adminComments } = req.body;
    const { id } = req.params;

    const validStatuses = ['pending', 'under_review', 'accepted', 'rejected'];
    if (!validStatuses.includes(adminStatus)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const candidate = await User.findByIdAndUpdate(
      id,
      { 
        adminStatus,
        reviewDate: new Date(),
        adminComments: adminComments || '',
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.json({ message: 'Status updated successfully', candidate });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Admin server is running!' });
});

export { app };
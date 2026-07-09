import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import profileRoutes from './routes/profileRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';   // <-- import fs to check/create folder

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// Create uploads folder if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// CORS – allow your frontend domain
app.use(cors({
  origin: '*' // or your frontend URL
}));

app.use(express.json());

// ---- SERVE STATIC FILES FROM UPLOADS FOLDER ----
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes – now /api/profile works
app.use('/api', profileRoutes);

// Catch‑all route – serves your React frontend (if you deploy backend + frontend together)
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

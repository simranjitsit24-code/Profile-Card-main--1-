import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import profileRoutes from './routes/profileRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


app.get('/', (req, res) => {
  res.send('Profile Card API is running!');
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

dotenv.config(); // Load env vars first

connectDB(); // Connect to DB

const app = express();

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({ origin: '*' }));
app.use(express.json());

// Use the routes
app.use(profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

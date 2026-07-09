import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import profileRoutes from './routes/profileRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// CORS – allow your frontend domain
app.use(cors({
  origin: '*' // or '*' for testing
}));

app.use(express.json());

// API routes
app.use('/api', profileRoutes); // Make sure your routes use '/api' prefix

// ---- ADD THIS SECTION ----
// Root route – tell people the API is alive
app.get('/', (req, res) => {
  res.send('Profile Card API is running!');
});

// If you want to serve the React frontend from the same server:
// (only if you have built your React app and copied the 'dist' folder into the server folder)
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

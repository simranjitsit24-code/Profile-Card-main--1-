import express from 'express';
import { createProfile, deleteProfile } from '../controllers/profileController.js';
import upload from '../middleware/upload.js';   // import the middleware

const router = express.Router();

// Use upload.single('image') – 'image' must match the field name in your frontend FormData
router.post('/profile', upload.single('image'), createProfile);
router.delete('/profile/:id', deleteProfile);

export default router;

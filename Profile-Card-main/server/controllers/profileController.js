import User from '../models/User.js';
import fs from 'fs';
import path from 'path';

// POST – create a new profile (and return formatted data)
export const createProfile = async (req, res) => {
  try {
    const { name, title, bio, phoneNumber, email, bloodGroup, address } = req.body;
    if (!name || !bio) {
      return res.status(400).json({ error: 'Name and bio are required' });
    }

    // If a file was uploaded, build the URL; otherwise use a default
    const imageUrl = req.file 
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` 
      : 'https://via.placeholder.com/150';

    const newUser = new User({ 
      name, 
      title, 
      bio, 
      imageUrl, 
      phoneNumber, 
      email, 
      bloodGroup, 
      address 
    });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Profile creation error:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE – remove a profile by ID (and delete its image if uploaded)
export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Try to delete the uploaded image file if it's not the default placeholder
    if (user.imageUrl && user.imageUrl.includes('/uploads/')) {
      const filename = user.imageUrl.split('/uploads/')[1];
      if (filename) {
        const filePath = path.resolve('uploads', filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Profile deletion error:', error);
    res.status(500).json({ error: error.message });
  }
};
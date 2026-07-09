import { useState, useRef } from 'react';
import axios from 'axios';

const ProfileForm = ({ setProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    phoneNumber: '',
    email: '',
    bloodGroup: '',
    address: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('title', formData.title);
      data.append('bio', formData.bio);
      data.append('phoneNumber', formData.phoneNumber);
      data.append('email', formData.email);
      data.append('bloodGroup', formData.bloodGroup);
      data.append('address', formData.address);
      if (imageFile) {
        data.append('image', imageFile);
      }

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(
        `${apiUrl}/profile`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setProfile(response.data);
      setFormData({ 
        name: '', 
        title: '', 
        bio: '', 
        phoneNumber: '', 
        email: '', 
        bloodGroup: '', 
        address: '' 
      });
      setImageFile(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create profile.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>Create Your Profile</h2>
      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          name="name"
          placeholder="e.g. Alishba Amna"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Job Title</label>
        <input
          type="text"
          name="title"
          placeholder="e.g. Graphic Designer"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Bio *</label>
        <textarea
          name="bio"
          placeholder="Tell us about yourself..."
          rows="3"
          value={formData.bio}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="e.g. +1 (555) 000-0000"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="e.g. jane.smith@example.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Blood Group</label>
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          placeholder="e.g. 123 Main St, New York, NY"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group file-upload-group">
        <label>Profile Image</label>
        <div className="file-upload-wrapper">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
            id="profile-image-upload"
          />
          <label htmlFor="profile-image-upload" className="file-upload-label">
            {imagePreview ? (
              <div className="preview-container">
                <img src={imagePreview} alt="Preview" className="image-preview" />
                <div className="change-image-overlay">
                  <span className="change-image-btn">Change Image</span>
                </div>
              </div>
            ) : (
              <div className="upload-placeholder">
                <span className="upload-icon">📷</span>
                <span className="upload-text">Click to upload photo</span>
                <span className="upload-hint">PNG, JPG or GIF</span>
              </div>
            )}
          </label>
        </div>
      </div>
      <button type="submit">Generate Profile Card</button>
    </form>
  );
};

export default ProfileForm;
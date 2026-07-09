import { useState } from 'react';
import axios from 'axios';
import ProfileForm from './components/ProfileForm';
import ProfileCard from './components/ProfileCard';
import './index.css';

function App() {
  const [profile, setProfile] = useState(null);

  const handleDelete = async (id) => {
    try {
      setProfile(null); // Vanish the card immediately
      let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      if (window.location.hostname === 'localhost' && apiUrl.includes('github.dev')) {
        apiUrl = 'http://localhost:5000/api';
      }
      await axios.delete(`${apiUrl}/profile/${id}`);
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Failed to delete profile.');
    }
  };

  return (
    <div className="app">
      <h1>Profile Builder</h1>
      <ProfileForm setProfile={setProfile} />
      <ProfileCard profile={profile} onDelete={handleDelete} />
    </div>
  );
}

export default App;
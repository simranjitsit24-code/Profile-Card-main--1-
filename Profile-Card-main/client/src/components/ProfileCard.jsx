const ProfileCard = ({ profile, onDelete }) => {
  if (!profile) return null;

  return (
    <div className="profile-card-container">
      <div className="profile-card">
        <div className="card-header">
          <span className="company-name">Acme Inc.</span>
          {onDelete && (
            <button className="delete-card-btn" onClick={() => onDelete(profile._id)} title="Delete Profile">
              🗑️
            </button>
          )}
        </div>
        <div className="card-body">
          <div className="avatar">
            <img src={profile.imageUrl} alt={profile.name} />
          </div>
          <h2 className="name">{profile.name}</h2>
          {profile.title && <p className="title">{profile.title}</p>}
          <p className="bio">{profile.bio}</p>
        </div>
        <div className="card-footer">
          <div className="extra-info">
            {profile.phoneNumber && <span>📞 {profile.phoneNumber}</span>}
            <span>✉️ {profile.email || `${profile.name?.toLowerCase().replace(/\s+/g, '.')}@example.com`}</span>
            {profile.bloodGroup && <span>🩸 Blood Group: {profile.bloodGroup}</span>}
            {profile.address && <span>📍 {profile.address}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
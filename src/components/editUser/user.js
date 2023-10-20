import React, { useState } from 'react';
import './user.css';

const EditProfile = () => {
  const [name, setName] = useState('Your Name');
  const [email, setEmail] = useState('youremail@example.com');
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <label className="image-upload-label">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="image-upload-input"
        />
        <div className="profile-image-container">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profile-image" />
          ) : (
            <span className="add-image-button">No Profile Image</span>
          )}
        </div>
      </label>

      <h1>Edit Your Profile</h1>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="email"
          className="input-field"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Add LinkedIn"
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Add Instagram"
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Add Facebook"
        />
      </div>
      <button className="save-button">Update Profile</button>
    </div>
  );
};

export default EditProfile;

import React, { useState,useEffect } from 'react';
import './user.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedIn] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const BASE_URL = 'http://localhost:8000'; // Replace with your API base URL

  // Fetch user profile data when the page loads
  useEffect(() => {
    const userID = localStorage.getItem('userId');
    axios.get(`${BASE_URL}/users/${userID}`)
      .then((response) => {
        console.log("response is",response)
        const userData = response.data.data.user;

        setName(userData.name || '');
        setEmail(userData.email || '');
        setLinkedIn(userData.linkedinLink || '');
        setInstagram(userData.instagramLink || '');
        setFacebook(userData.facebookLink || '');
        // Set the existing profile image if available
        if (userData.profileImage) {
          setProfileImage(userData.profileImage);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data: ', error);
      });
  }, []); 

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };
 const handleChangePassword = async()=>{
  navigate('/changePassword')
 }

  const handleUpdateProfile = async () => {
    let userID = localStorage.getItem('userId');
    console.log('userId is ---------', userID);

    // Upload the image if a new one is selected
    let imageUrl = profileImage;
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);

      try {
        const imageResponse = await axios.post(`${BASE_URL}/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        imageUrl = imageResponse.data?.data?.data?.imageUrl; // Get the new image URL
      } catch (error) {
        console.log('Error uploading image: ', error);
      }
    }

    // Prepare the updated profile data to send to the backend
    console.log("profile image url is",imageUrl)
    const updatedProfileData = {
      name,
      email,
      linkedin,
      instagram,
      facebook,
      profileImage: imageUrl, // Include the new image URL
      
    };
    console.log("updated profile data is",updatedProfileData)
    try{
    const response = await axios.put(`${BASE_URL}/users/${userID}`, {
      name:name || '',
        email:email|| '',
        profileImage:imageUrl || '',
        instagramLink:instagram || '',
        linkedinLink:linkedin || '',
        facebookLink:facebook || ''
    });

    if (response.status === 200) {
      Swal.fire(
        'Congrats',
        'User updated successfully!',
        'success'
    );
    navigate('/home');
    }}
   catch (error) {
    console.log('Error updating blog post: ', error);
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
          placeholder="LinkedIn Profile"
          value={linkedin}
          onChange={(e) => setLinkedIn(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Instagram Profile"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Facebook Profile"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
      </div>
      <button className="save-button" onClick={handleUpdateProfile}>
        Update Profile
      </button>
      <button className="save-button" onClick={handleChangePassword}>
        Change Password
      </button>
      
    </div>
  );
};

export default EditProfile;

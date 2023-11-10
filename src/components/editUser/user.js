import React, { useState, useEffect } from 'react';
import './user.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  linkedin: Yup.string(),
  instagram: Yup.string(),
  facebook: Yup.string(),
});

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedIn] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  
  const BASE_URL = 'http://localhost:8000'; // Replace with your API base URL



  useEffect(() => {
    const userID = localStorage.getItem('userId');
    axios.get(`${BASE_URL}/users/${userID}`)
      .then((response) => {
        const userData = response.data.data.user;
        setName(userData.name || '');
        setEmail(userData.email || '');
        setLinkedIn(userData.linkedinLink || '');
        setInstagram(userData.instagramLink || '');
        setFacebook(userData.facebookLink || '');
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
  const handlechangePassword = async () =>{
    navigate('/changePassword')
  }
  const handleUpdateProfile = async () => {
    try {
      await validationSchema.validate(
        {
          name,
          email,
          linkedin,
          instagram,
          facebook,
        },
        { abortEarly: false } // Collect all validation errors
      );

      let userID = localStorage.getItem('userId');
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

          imageUrl = imageResponse.data?.data?.data?.imageUrl;
          console.log("image url is", imageUrl)
        } catch (error) {
          console.log('Error uploading image: ', error);
        }
      }

      const updatedProfileData = {
        name,
        email,
        linkedin,
        instagram,
        facebook,
        profileImage: imageUrl,
      };

      const response = await axios.put(`${BASE_URL}/users/${userID}`, updatedProfileData);

      if (response.status === 200) {
        Swal.fire('Congrats', 'User updated successfully!', 'success');
        // navigate('/home');
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else {
        console.log('Error updating profile: ', error);
      }
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
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className="input-container">
        <input
          type="email"
          className="input-field"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}
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
      <button className="save-button" onClick={handlechangePassword}>
        change Password
      </button>
    </div>
    
  );
};

export default EditProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  StyledNavbar,
  ProfileIcon,
  MenuLink,
  Dropdown,
  Menu,
  Hamburger,
  StyledProfileIcon,
  SocialIcon,
  UserProfileImage,
  UserProfileImage1,
  EditButton,
  Logoutbutton,
} from './NavElement';
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './index.css';



const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState('');
  const BASE_URL = 'http://localhost:8000';
  console.log(userData.profileImage)
  useEffect(() => {
    const userID = localStorage.getItem('userId');
    axios
      .get(`${BASE_URL}/users/${userID}`)
      .then((response) => {
        const userData = response.data.data.user;
        setUserData(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data: ', error);
      });
  }, []);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEditUser = () => {
    navigate('/editProfile');
  };

  const handleLogout = () => {
    localStorage.clear('username');
    localStorage.clear('name');
    localStorage.clear('userToken');
    localStorage.clear('userId');
    navigate('/');
  };

  return (
    <>
      <StyledNavbar>
        <Hamburger />
        <Menu>
          <MenuLink to="/home" activeStyle>
            HOME
          </MenuLink>
          <MenuLink to="/about" activeStyle>
            ABOUT
          </MenuLink>
          <MenuLink to="/contact" activeStyle>
            CONTACT
          </MenuLink>
        </Menu>
        <ProfileIcon onClick={handleProfileClick}>
        <UserProfileImage src={userData.profileImage} alt="Profile" />
      </ProfileIcon>
      </StyledNavbar>

      <Dropdown show={showDropdown}>
        <StyledProfileIcon>
          <div>
          <UserProfileImage1 src={userData.profileImage} alt="Profile" />
          </div>
          <div className="name">{userData.name}</div>
          <div className="editButton">
            <EditButton onClick={handleEditUser}>
              <ul>Edit Profile</ul>
            </EditButton>
          </div>
          <div className="social-icons">
            <a href={userData.instagramLink} target="_blank" rel="noopener noreferrer">
              <SocialIcon as={FaInstagram} />
            </a>
            <a href={userData.facebookLink} target="_blank" rel="noopener noreferrer">
              <SocialIcon as={FaLinkedin} />
            </a>
            <a href={userData.linkedinLink} target="_blank" rel="noopener noreferrer">
              <SocialIcon as={FaFacebook} />
            </a>
          </div>
        </StyledProfileIcon>

        <Logoutbutton onClick={handleLogout}>LOG OUT</Logoutbutton>
      </Dropdown>
    </>
  );
};

export default Navbar;

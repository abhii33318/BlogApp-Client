import React, { useState } from 'react';
import { StyledNavbar, ProfileIcon, MenuLink, Dropdown, Menu, Hamburger } from './NavElement';
import { FaUser } from 'react-icons/fa'; // Import the user icon
import styled from 'styled-components'; // Import styled-components
import { useNavigate } from 'react-router-dom';
import './index.css'

const StyledProfileIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled(FaUser)`
  font-size: 24px;
  color: #007bff; /* Choose your desired color */
  margin-bottom: 5px;
`;
const Logoutbutton = styled.div`
  display: inline-block;
  background-color: #303842;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  width: 200px;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 5px;

  /* Add hover styling */
  &:hover {
    background-color: red; /* Change the hover background color to red */
    cursor: pointer;
  }
`;

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.clear('username')
    localStorage.clear('name')
    localStorage.clear('userToken')
    localStorage.clear('userId')
    navigate('/');
    // Implement your logout logic here
  };
  // let username = localStorage.getItem("username")
  let name = localStorage.getItem("name")

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
          <FaUser size={20} />
        </ProfileIcon>
      </StyledNavbar>

      <Dropdown show={showDropdown}>
        <StyledProfileIcon>
          <ProfileImage />
          {/* Display Username */}
          <div className='name'>{name}</div>
          <div className='editButton'>
          <ul>edit profile</ul>
          </div>
        </StyledProfileIcon>
        {/* Logout Button */}
        <Logoutbutton onClick={handleLogout}>LOG OUT</Logoutbutton>
      </Dropdown>
    </>
  );
};

export default Navbar;

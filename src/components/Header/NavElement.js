import { FaBars } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa';
import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'
export const PrimaryNav = styled.nav`
  z-index: 14;
  height: 50px;
  display: flex;
  background: #8bc;
  justify-content: space-between;
  padding: 0.18rem calc((100vw - 1000px) / 2);
`
export const MenuLink = styled(Link)`
  color: #fff;
  margin-left:66px;
  display: flex;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  padding: 0 3.2rem;
  height: 100%;
  &.active {
    color: #000000;
  }
`
export const Hamburger = styled(FaBars)`
  display: none;
  color: #ffffff;
  @media screen and (max-width: 768px) {
    display: block;
    font-size: 1.9rem;
    top: 0;
    right: 0;
    position: absolute;
    cursor: pointer;
    transform: translate(-100%, 75%);
  }
`
export const Menu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -25px;
  @media screen and (max-width: 100px) {
    display: none;
  }
`
export const StyledNavbar = styled.nav`
  z-index: 14;
  height: 50px;
  display: flex;
  background: #8bc;
  justify-content: space-between;
  padding: 0.18rem calc((100vw - 1000px) / 2);
`;

export const ProfileIcon = styled.div`
  cursor: pointer;
  display: flex;
  justify-content:flex-end;
  align-items: center;
  position:relative;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 55px; /* Adjust the distance below the Navbar */
  right: 140px;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add a subtle shadow for depth */
  border-radius: 5px; /* Rounded corners */
  padding: 10px 20px; /* Adjust padding for better spacing */
  display: ${props => (props.show ? 'block' : 'none')};
  z-index: 15;

  /* Add transitions for smoother appearance */
  transition: transform 0.3s ease, opacity 0.3s ease;

  
  &:hover {
    transform: translateY(5px); /* Move the dropdown down slightly on hover */
  }

  
  & > * {
    margin-bottom: 1px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f0f0f0; /* Background color on hover */
    }
  }
`;
export const StyledProfileIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImage = styled(FaUser)`
  font-size: 24px;
  color: #007bff; /* Choose your desired color */
  margin-bottom: 5px;
`;

export const SocialIcon = styled.div`
  font-size: 20px;
  margin: 15px; /* Add spacing between icons */
  cursor: pointer; /* Add a pointer cursor on hover */
  transition: color 0.3s; /* Add a smooth color transition on hover */
  color: #1a1c1d;

  &:hover {
    color: #ff6600; /* Change the color on hover */
  }
`;


export const Logoutbutton = styled.div`
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
  margin-bottom: 10px;

  /* Add hover styling */
  &:hover {
    background-color: red; /* Change the hover background color to red */
    cursor: pointer;
  }
`;
export const EditButton = styled.div`
  ul {
    cursor: pointer;
    transition: color 0.3s; /* Add a smooth color transition on hover */
    color: #007bff;
  }

  ul:hover {
    color: #ff6600; /* Change the color on hover */
  }
`;

export const UserProfileImage = styled.img`
  width: 28px; /* Adjust the width and height as needed */
  height: 28px;
  border-radius: 50%; /* Create a circular shape */
  overflow: hidden; /* Hide the overflow to make it circular */
  margin-bottom: 3px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  object-fit: cover;
`;
export const UserProfileImage1 = styled.img`
width: 74px; /* Adjust the width and height as needed */
height: 74px;
border: 2px solid #007bff; /* Add a border with the desired color */
border-radius: 50%; /* Create a circular shape */
overflow: hidden; /* Hide the overflow to make it circular */
object-fit: cover;
margin-bottom: 10px;
box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
`;
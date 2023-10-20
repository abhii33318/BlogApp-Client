import { FaBars } from 'react-icons/fa'
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
  right: 135px;
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
    margin-bottom: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f0f0f0; /* Background color on hover */
    }
  }
`;
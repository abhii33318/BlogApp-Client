import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  // Add a function to perform the redirect when the component is rendered
  navigate('/login');

  // You can also return null or an empty component if you prefer
  return null;
}

export default Logout;

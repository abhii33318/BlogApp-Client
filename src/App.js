
// import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUp from './components/SignUp/SignupTest';
import Login from './components/Login/Login';
import PrivateRoutes from './components/ProtectedRoute/ProtectedRoute';

import Home from './components/Pages/Home/Home'
import About from './components/Pages/About/About';
import Contact from './components/Pages/Contact/Contact';
import Logout from './components/Pages/Logout';
import CreatePost from './components/blog/CreateUpdateBlog/CreateBlog'
import BlogDetails from './components/blog/BlogView/BlogDetails';
import UpdateBlog from './components/blog/CreateUpdateBlog/UpdateBlog';


function App() {
  return (
    
    <Router>
     <Routes> 
      <Route element={<PrivateRoutes/>}  >
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logout" element={<Logout />} />
        
      
      </Route>
        
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/" element={<Login/>} />
        <Route path="/createBlog" element={<CreatePost/>} />
        <Route path="/blog/:id" element={<BlogDetails/>} />
        <Route path="/update-blog/:id" element={<UpdateBlog />} />

        </Routes>
    </Router>  
  );
}

export default App;


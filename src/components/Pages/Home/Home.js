import React, { useState, useEffect } from 'react';
import Navbar from '../../Header';
import videoBg from '../../../assets/vbg.mp4';
import AuthService from '../../../services/AuthService';
import Sidebar from '../../Sidebar/sidebar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [draftData, setDraftData] = useState([]);
  const [showDrafts, setShowDrafts] = useState(false); // Flag to control whether to show draft data

  useEffect(() => {
    if (!showDrafts) {
      fetchData(selectedCategory);
    } else {
      fetchUserDrafts();
    }
  }, [selectedCategory, showDrafts]);

  const fetchData = async (category) => {
    try {
      const response = await AuthService.getAllposts();
      const filteredData =
        category === 'All' ? response : response.filter(blog => blog.category === category);
      setBlogData(filteredData);
      setShowDrafts(false); // Disable draft data when fetching regular data
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const createBlog = () => {
    navigate('/createBlog');
  }

  const fetchUserDrafts = async () => {
    try {
      // Replace 'loggedInUserId' with the actual user ID of the logged-in user
      const response = await AuthService.getDraftbyUserId();
      console.log("draft response",response);
      setDraftData(response.data.data.data);
      setShowDrafts(true); // Enable draft data when fetching user drafts
    } catch (error) {
      console.error('Error fetching drafts: ', error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === 'Draft') {
      // If 'Draft' is selected, set the flag to show drafts and fetch draft data
      setShowDrafts(true);
      fetchUserDrafts();
    } else {
      // For other categories, set the flag to not show drafts and fetch regular data
      setShowDrafts(false);
      fetchData(category);
    }
  };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Navbar />
      <video autoPlay loop muted className="blog-video">
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='card'>
        <div>
          <button onClick={createBlog} className='createBlogButton'>Create Blog</button>
          <div className='filterside'>
            <Sidebar onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} fetchUserDrafts={fetchUserDrafts} />
          </div>
        </div>
        <div className='card-components'>
          {showDrafts ? (
            draftData.map((draft) => (
              <Link to={`/blog/${draft._id}`} key={draft._id} className="blog-card-link">
                <div className="blog-card" key={draft.id}>
                  <h2>{draft.title}</h2>
                  <img src={draft.blogImage} alt={draft.title} />
                  <div className="meta">
                    <p>Author: {draft?.created_by?.name}</p>
                    <p>Date: {formatDate(draft.createdAt)}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            blogData.map((blog) => (
              <Link to={`/blog/${blog._id}`} key={blog._id} className="blog-card-link">
                <div className="blog-card" key={blog.id}>
                  <h2>{blog.title}</h2>
                  <img src={blog.blogImage} alt={blog.title} />
                  <div className="meta">
                    <p>Author: {blog?.created_by?.name}</p>
                    <p>Date: {formatDate(blog.createdAt)}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

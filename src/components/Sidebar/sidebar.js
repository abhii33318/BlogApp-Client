import React from 'react';
import './sidebar.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import AuthService from '../../services/AuthService';

const Sidebar = ({ onCategorySelect, selectedCategory, fetchUserDrafts }) => {
  // const categories = ['All', 'Sports', 'Arts', 'Music', 'History', 'Others', 'Draft'];
  const [categories, setCategoryList] = useState([]);


  // const response =  AuthService.getCategoryList();
  // console.log(response)

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    axios.get('http://localhost:8000/category')
        .then((response) => {
            // setCategories(response.data);
            let categoryList = response.data.map(r=>r.category)
            let finalCategoryList = ['All','Draft', ...categoryList]
            setCategoryList(finalCategoryList)
        })
        .catch((error) => {
            console.error('Error fetching categories:', error);
        });
}, []);
  

  const handleDraftClick = () => {
    fetchUserDrafts();
    onCategorySelect('Draft'); // Set the selected category to 'Draft'
  };

  return (
    <div className="sidebar">
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={category === selectedCategory ? 'active' : ''}
          >
            <a href="#" onClick={() => {
              if (category === 'Draft') {
                handleDraftClick(); // Call handleDraftClick for the 'Draft' category
              } else {
                onCategorySelect(category); // Call onCategorySelect for other categories
              }
            }}>
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './sidebar.css';

const Sidebar = ({ onCategorySelect, selectedCategory, fetchUserDrafts}) => {
  const [categories, setCategoryList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/category')
      .then((response) => {
        let categoryList = response.data.map((r) => r.category);
        let finalCategoryList = ['All','My blogs', 'Draft', ...categoryList];
        setCategoryList(finalCategoryList);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div className="sidebar">
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={category === selectedCategory ? 'active' : ''}
          >
            <a
              href="#"
              onClick={() => {
                if (category === 'Draft') {
                  handleDraftClick(); // Call handleDraftClick for the 'Draft' category
                } 
                                else {
                  onCategorySelect(category); // Call onCategorySelect for other categories
                }
              }}
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  function handleDraftClick() {
    console.log("inside handleDraftClick")
    fetchUserDrafts();
    onCategorySelect('Draft');
  }
 
};


export default Sidebar;

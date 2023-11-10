import axios from 'axios';
// import { useState } from 'react';

const BASE_URL = 'http://localhost:8000';
// const userId = localStorage.getItem('userId') 

const AuthService = {
  // const [userId, setUserId] = useState(localStorage.getItem('userId'));
  // const userId = localStorage.getItem('userId') 
  
  login: async (username, password) => {
    try {
      
      const response = await axios.post(`${BASE_URL}/token`, {
        username,
        password,
      }); 
      console.log(response)
      
      return response // Assuming your backend returns user data on successful login
    } catch (error) {
      throw error;
    }
  },

  signup:async (name,username,email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, {
        name,
        username,
        email,
        password,
      });
      return response; // Assuming your backend returns user data on successful login
    } catch (error) {
      throw error;
    }
  },

  getAllposts: async()=>{
    try {

      const response = await axios.get(`${BASE_URL}/blogs`,{});
      console.log(response.data.data.data)
      const   res=response.data.data.data
      return res
      
    } 
    catch (error) {
      throw error;
      
    }
  },

 

  createBlog:async (post) => {
    try {
      console.log(post)
      console.log(post.title)
      console.log(post.description)
      const response = await axios.post(`${BASE_URL}/blogs`, 
        post
      );
      return response; // Assuming your backend returns user data on successful login
    } catch (error) {
      throw error;
    }
  },

  DraftBlog:async (post,status)=>{
    try {
      const response = await axios.post(`${BASE_URL}/saveDraft`, 
      post,status);
      return response;
      
    } catch (error) {
      throw error;
    }

  },
  getDraftbyUserId: async()=>{
    try{
      const userId = localStorage.getItem('userId') 
      const response = await axios.get(`${BASE_URL}/draft/${userId}`)
      return response;

    }catch(error){
      throw error;
    }

  },

  getBlogsbyUserId: async()=>{
    try{
      const userId = localStorage.getItem('userId') 
      const response = await axios.get(`${BASE_URL}/blogss/${userId}`)
      return response;

    }catch(error){
      throw error;
    }

  },
  


getCategoryList: async()=>{

  try{
    const response = await axios.get(`${BASE_URL}/category`)
    return response;

  }catch(error){
    throw error;
  }

}
};

export default AuthService;

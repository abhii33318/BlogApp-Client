import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BlogDetails.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const BASE_URL = 'http://localhost:8000';

const BlogDetails = () => {
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState({});
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  

  const [editCommentId, setEditCommentId] = useState(null); 
  const [editedCommentText, setEditedCommentText] = useState('');
  console.log(blogDetails.status);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blogs/${id}`);
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);
        setBlogDetails(response.data[0]);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchBlogDetails();
    fetchComments();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/comments/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments: ', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/blogs/${id}`);
      navigate('/home');
    } catch (error) {
      console.error('Error deleting blog post: ', error);
    }
  };

  const handleExit = () => {
    navigate('/home');
  };

  const isCommentEditable = (comment) => {
    const commentTimestamp = new Date(comment.createdAt).getTime();
    const currentTime = new Date().getTime();
    const thirtyMinutesInMillis = 30 * 60 * 1000;

    if (userId === comment.UserId && currentTime - commentTimestamp <= thirtyMinutesInMillis) {
      return true;
    }

    return false;
  };

  const handleCommentEdit = (commentId) => {
    const commentToEdit = comments.find((comment) => comment._id === commentId);
    if (isCommentEditable(commentToEdit)) {
      setEditCommentId(commentId);
      setEditedCommentText(commentToEdit.comments);
    }
  };

  const handleCommentUpdate = async (commentId) => {
    if (editedCommentText.trim() !== '') {
      try {
        const response = await axios.put(`${BASE_URL}/comments/${commentId}`, {
          text: editedCommentText,
        });

        if (response.status === 200) {
          setEditCommentId(null);
          fetchComments();
        } else {
          console.error('Error updating comment: ', response.data.error);
        }
      } catch (error) {
        console.error('Error updating comment: ', error);
      }
    }
  };

  const handleCommentSubmit = async () => {
    if (commentText.trim() !== '') {
      const newComment = {
        text: commentText,
        name: localStorage.getItem('name'),
        UserId: userId,
      };

      try {
        await axios.post(`${BASE_URL}/comments/${id}`, newComment);
        setCommentText('');
        fetchComments();
      } catch (error) {
        console.error('Error submitting comment: ', error);
      }
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`${BASE_URL}/comments/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment: ', error);
    }
  };

  return (
    <div className="blog-div">
      <div className="blog-details-container">
        <div className="exit-button" onClick={handleExit}>
          <ExitToAppIcon />
        </div>

        <h2 className="blog-title">{blogDetails.title}</h2>
        <img src={blogDetails.blogImage} alt={blogDetails.title} className="blog-image" />
        <p dangerouslySetInnerHTML={{ __html: blogDetails.description }} className="blog-content" />
        <div className="meta">
          <p className="meta-item">Author: {blogDetails?.created_by?.name}</p>
          <p className="meta-item">Date: {formatDate(blogDetails.createdAt)}</p>
          {userId === blogDetails?.created_by?._id && (
            <div className="edit-delete">
              <Link to={`/update-blog/${id}`} className="edit-link">
                Update
              </Link>
              <Link className="delete-link" onClick={handleDelete}>
                Delete
              </Link>
            </div>
          )}
        </div>
        {blogDetails.status === 'published' && (
          <div className="comment-container">
            <h3>Comments</h3>
            <div>
              <textarea
                rows="4"
                cols="50"
                placeholder="Add your comment here..."
                className="comment-input"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button onClick={handleCommentSubmit} className="comment-submit">
                Submit
              </button>
            </div>

            <div className="comment-list">
              {comments.map((comment) => (
                <div className="comment" key={comment._id}>
                  <div className="comment-content">
                    <div className="comment-author">{comment.name}</div>
                    {editCommentId === comment._id ? (
                      <textarea
                        rows="4"
                        cols="50"
                        className="comment-input"
                        value={editedCommentText}
                        onChange={(e) => setEditedCommentText(e.target.value)}
                      />
                    ) : (
                      <div className="space">
                        {editCommentId === comment._id ? editedCommentText : comment.comments}
                      </div>
                    )}
                    <div className="comment-timestamp">Posted on: {formatDate(comment.createdAt)}</div>
                  </div>
                  <span className="comment-actions">
                    {userId === comment.UserId || userId === blogDetails?.created_by?._id ? (
                      <>
                        {isCommentEditable(comment) && (
                          <>
                            {editCommentId === comment._id ? (
                              <button className="CommentUpdate" onClick={() => handleCommentUpdate(comment._id)}>
                                Update
                              </button>
                            ) : (
                              <span className="edit-comment-icon" onClick={() => handleCommentEdit(comment._id)}>
                                <EditIcon />
                              </span>
                            )}
                          </>
                        )}
                        <span className="delete-comment-icon" onClick={() => handleCommentDelete(comment._id)}>
                          <DeleteIcon />
                        </span>
                      </>
                    ) : null}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;

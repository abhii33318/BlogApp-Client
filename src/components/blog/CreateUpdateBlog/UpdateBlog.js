
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './update.css';
import { styled, Box, Button, InputBase, FormControl } from '@mui/material';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import { AddCircle as AddIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:8000';

const StyledFormControl = styled(FormControl)`
    margin-top: 15px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const QuillEditor = styled(ReactQuill)`
    margin-top: 20px;
    padding: 10px; /* Adjust padding as needed */
    font-size: 18px; /* Adjust the font size as needed */
    border: 1px solid #ccc; /* Add a border if desired */
    border-radius: 5px; /* Add border-radius if you want rounded corners */
    min-height: 200px; /* Set a minimum height if needed */
    /* Other CSS properties as needed */
`;

const Container = styled(Box)(({ theme }) => ({
  margin: '10px 50px',
  [theme.breakpoints.down('md')]: {
    margin: 0
  }
}));

const ImageContainer = styled('div')({
  position: 'relative',
  width: '100%',
  height: '60vh',
});

const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const FileInput = styled('input')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
});

const UploadIcon = styled(AddIcon)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: 48, 
  color: 'rgba(255, 255, 255, 0.7)', // Adjust the color and opacity
  pointerEvents: 'none', // Prevent the icon from blocking clicks on the input
});
const UpdateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log('id is', id);

  const [existingPost, setExistingPost] = useState({
    title: '',
    description: '',
    blogImage: '', // Initialize with an empty string
    category: '',
  });

  const [editorContent, setEditorContent] = useState('');
  const [imageFile, setImageFile] = useState(null); // Add state for image file
  const [selectedCategory, setSelectedCategory] = useState(''); // Initialize with an empty string
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Add state for dropdown
  const [status, setStatus] = useState('draft');
  console.log("category is",categories)
  useEffect(() => {
    const fetchExistingPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blogs/${id}`, {});
        const blogData = response.data[0];

        setExistingPost({
          title: blogData.title || '',
          description: blogData.description || '',
          blogImage: blogData.blogImage || '', // Set the existing image URL
          category: blogData.category || '', // Set the existing category
        });

        setEditorContent(blogData.description || '');
        setSelectedCategory(blogData.category || ''); 
        setStatus(blogData.status || 'draft'); 
      } catch (error) {
        console.error('Error fetching existing blog post: ', error);
      }
    };
    axios.get('http://localhost:8000/category')
    .then((response) => {
        setCategories(response.data);
        console.log("category data inside is", response.data.category)
    })
    .catch((error) => {
        console.error('Error fetching categories:', error);
    });

    fetchExistingPost();

  }, [id]);

  const updatePost = async () => {
    try {
      let imageUrl = existingPost.blogImage; // Initialize with the existing image URL

      if (imageFile) {
        // If a new image is selected, upload it and get the new URL
        const formData = new FormData();
        formData.append('file', imageFile);

        const imageResponse = await axios.post(`${BASE_URL}/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        imageUrl = imageResponse.data?.data?.data?.imageUrl; // Get the new image URL
      }

      // Send updated data to your server using an API call
      const response = await axios.put(`${BASE_URL}/blogs/${id}`, {
        title: existingPost.title,
        description: editorContent,
        blogImage: imageUrl, // Use the new image URL or the existing one
        category: selectedCategory || existingPost.category, // Use the new category or the existing one
      });

      if (response.status === 200) {
        navigate(`/blog/${id}`);
        console.log("updated sucessfully")
      }
    } catch (error) {
      console.log('Error updating blog post: ', error);
    }
  };

  const publishDraftPost = async () => {
    try {
      let imageUrl = existingPost.blogImage; // Initialize with the existing image URL

      if (imageFile) {
        // If a new image is selected, upload it and get the new URL
        const formData = new FormData();
        formData.append('file', imageFile);

        const imageResponse = await axios.post(`${BASE_URL}/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        imageUrl = imageResponse.data?.data?.data?.imageUrl; // Get the new image URL
      }

      // Send updated data to your server using an API call
      const response = await axios.put(`${BASE_URL}/blogs/${id}`, {
        title: existingPost.title,
        description: editorContent,
        blogImage: imageUrl, // Use the new image URL or the existing one
        category: selectedCategory || existingPost.category, 
        status: 'published'
      });

      if (response.status === 200) {
        navigate(`/home`);
        Swal.fire(
          'Congrats',
          'Draft Published successfully!',
          'success'
      );
        console.log("published sucessfully")
      }
    } catch (error) {
      console.log('Error publishing draft post: ', error);
    }
  };



  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${BASE_URL}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImageFile(file); // Store the selected image file
      alert('File uploaded successfully!');

      // Update the existing image URL when a new image is chosen
      setExistingPost({ ...existingPost, blogImage: response.data?.data?.imageUrl });
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };

  const handleCategorySelect = (category) => {
    setExistingPost({ ...existingPost, category });
    setSelectedCategory(category);
    setIsOpen(false); // Close the dropdown after selection
  };

  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['clean'],
    ],
  };

  return (
    <div className='box'>
      <Container>
        <ImageContainer>
          {existingPost.blogImage || imageFile ? (
            <Image src={existingPost.blogImage || URL.createObjectURL(imageFile)} alt="updatedimage" />
          ) : null}
          <UploadIcon />
          <FileInput type="file" onChange={handleFileChange} />
        </ImageContainer>

        <StyledFormControl>
          <InputTextField
            name='title'
            placeholder='Title'
            value={existingPost.title}
            onChange={(e) =>
              setExistingPost({ ...existingPost, title: e.target.value })
            }
          />



          {/* Category dropdown */}
          <div className="dropdown-container">
        <div className="dropdown-header" onClick={toggleDropdown}>
          {selectedCategory || existingPost.category || 'Select a category'} &#9660;
        </div>
        {isOpen && (
          <ul className="dropdown-list2">
            {categories.map((option, index) => (
              <li
                key={index}
                onClick={() => handleCategorySelect(option.category)}
                className="dropdown-item"
              >
                {option.category}
              </li>
            ))}
          </ul>
        )}
      </div>
        </StyledFormControl>

        <QuillEditor
          value={editorContent}
          onChange={setEditorContent}
          modules={modules}
          placeholder='Write your content...'
        />
        <div className='ButtonStyle'>
        <Button onClick={() => updatePost()} variant='contained' color='primary'>
          Update
        </Button>

        {status === 'draft' && (
          <Button className='DraftPublishButton' onClick={() => publishDraftPost()} variant="contained" color="primary">
            Publish
          </Button>
        )}
        </div>
      </Container>
    </div>
  );
};

export default UpdateBlog;

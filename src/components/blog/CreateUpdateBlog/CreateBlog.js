import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled, Box, Button, InputBase, FormControl, IconButton, Tooltip } from '@mui/material';
import { AddCircle as AddIcon } from '@mui/icons-material';
import { Save as SaveIcon } from '@mui/icons-material';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import './create.css';
import AuthService from '../../../services/AuthService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

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
    padding: 10px;
    font-size: 18px;
    border: 1px solid #ccc;
    border-radius: 5px;
    min-height: 200px;
`;

const Container = styled(Box)(({ theme }) => ({
    margin: '10px 50px',
    [theme.breakpoints.down('md')]: {
        margin: 0,
    },
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

const initialPost = {
    title: '',
    description: '',
    blogImage: '',
    username: '',
    category: '',
};

const UploadIcon = styled(AddIcon)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 48,
    color: 'rgba(255, 255, 255, 0.7)',
    pointerEvents: 'none',
});

const CreatePost = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState(initialPost);
    const [responseData, setResponseData] = useState({});
    // const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [newCategoryInput, setNewCategoryInput] = useState('');
    console.log("category data is", categories)
    console.log("selectedOption",selectedOption)
    post.category= selectedOption

    useEffect(() => {
        // Fetch categories from the backend when the component mounts
        axios.get('http://localhost:8000/category')
            .then((response) => {
                setCategories(response.data);
                console.log("category data inside is", response.data)
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    post.blogImage = responseData?.data?.data?.imageUrl || 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    const url = post.blogImage ? post.blogImage : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('http://localhost:8000/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setResponseData(response.data);
            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again.');
        }
    };

    const savePost = async () => {
        try {
            const userData = await AuthService.createBlog(post);

            if (userData.status === 200) {
                Swal.fire(
                    'Congrats',
                    'Published successfully!',
                    'success'
                );
                navigate('/home');
            }
        } catch (error) {
            console.error('Error saving post:', error);
            Swal.fire('Error', 'Please fill the details', 'error');
        }
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const saveDraft = async () => {
        try {
            const userData = await AuthService.DraftBlog(post);

            if (userData.status === 200) {
                Swal.fire('Success', 'Draft saved successfully!', 'success');
                navigate('/home');
            }
        } catch (error) {
            Swal.fire('Error', 'Please fill the details', 'error');
            console.error('Error saving draft:', error);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        console.log("selected option is",option)
        
        // Save the selected category in the post state
        //  setPost(option);
        // post.category = option
    };
    const handleAddCategory = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.post('http://localhost:8000/category', {
                name: newCategoryInput,
                userId: userId,
            });

            if (response.status === 200) {
                // Append the new category object to the categories state
                setCategories([...categories, { category: newCategoryInput }]);
                setNewCategoryInput('');
                Swal.fire(
                    'Success',
                    'New category added successfully!',
                    'success'
                );
            }
        } catch (error) {
            console.error('Error adding new category:', error);
            Swal.fire('Error', 'Failed to add a new category', 'error');
        }
    };


    const [editorHtml, setEditorHtml] = useState('');
    post.description = editorHtml;
    let name = localStorage.getItem('name');
    post.username = name;
    post.created_by = localStorage.getItem('userId');
    

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['clean']
        ],
    };

    return (
        <div className="box">
            <Container>
                <ImageContainer>
                    <Image src={url} alt="post" />
                    <UploadIcon />
                    <FileInput type="file" onChange={handleFileChange} />
                </ImageContainer>

                <StyledFormControl>
                    <InputTextField onChange={(e) => handleChange(e)} name="title" placeholder="Title" />
                    <Tooltip title="Save as Draft">
                        <IconButton
                            onClick={() => saveDraft()}
                            color="primary"
                            className='draft1'
                            // style={{
                            //     color: 'grey',
                            //     width: 49px,
                            // }}
                        >
                            <SaveIcon />
                        </IconButton>
                    </Tooltip>
                    <div className="dropdown-container">
                        <div className="dropdown-header1" onClick={toggleDropdown}>
                            {selectedOption || 'Select an option'} &#9660;
                        </div>
                        {isOpen && (
                            <ul className="dropdown-list">
                                {categories.map((category, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleOptionSelect(category.category)}
                                        className="dropdown-item"
                                    >
                                        {category.category}
                                    </li>
                                ))}
                                <li className="dropdown-item">
                                    <div className="custom-category-input">
                                        <div className="input-container">
                                            <input
                                                type="text1"
                                                placeholder="New Category"
                                                value={newCategoryInput}
                                                onChange={(e) => setNewCategoryInput(e.target.value)}
                                            />
                                            <button onClick={handleAddCategory} className="custom-category-add-button">
                                                &#10003;
                                            </button>
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        )}
                    </div>
                    <Button className='buttonpublish' onClick={() => savePost()} variant="contained" color="primary">
                        Publish
                    </Button>
                </StyledFormControl>

                <QuillEditor
                    value={editorHtml}
                    onChange={setEditorHtml}
                    modules={modules}
                    placeholder="Write your content..."
                />
            </Container>
        </div>
    );
};

export default CreatePost;
import JoditEditor from 'jodit-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {MultiSelectUpdate} from '../Miscellaneous/Multiselect';
import { useDropzone } from 'react-dropzone';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import ImageUpload from '../components/ImageUpload';
import { app } from '../firebase';
import DefaultBlogImage from '../assets/DefaultBlog.webp';
import { Link, useNavigate } from 'react-router-dom';
import { blogSubmitStart, blogSubmitFailure, blogSubmitSuccess, clearError } from '../redux/user/userSlice.js';
import { useParams } from 'react-router-dom';

const UpdateABlog = ({ placeholder }) => {

    const [blog, setBlog] = useState([]);
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [droping, setDroping] = useState(false);
    const [newAvatar, setNewAvatar] = useState(DefaultBlogImage);
    const [uploadPercent, setUploadPercent] = useState(0);
    const [file, setFile] = useState(undefined);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [status, setStatus] = useState(null);

   
    const [formData, setFormData] = useState({
        userId: currentUser && currentUser._id,
        featuredImage: "https://st.depositphotos.com/1323882/3010/i/380/depositphotos_30101161-stock-photo-blue-mouse-and-cable-in.jpg",
    });

    const { blogUrl } = useParams()

    useEffect(() => {
        const getBlog = async () => {
            try {
                const res = await fetch("/api/auth/getBlogById", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ blogUrl }),
                });
                const data = await res.json();
                if (data.success) {
                    setBlog(data.data);
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getBlog();
    }, [blogUrl]);
    console.log(blog)

    const config = useMemo(() => ({
        removeButtons: ['selectall', 'copy', 'cut', 'ai-commands', 'ai-assistant', 'classSpan', 'about', 'selectall', 'superscript', 'subscript'],
        readonly: false,
        height: 600,
        allowResizeY: false,
        showBrand: false,
        placeholder: '',
    }), [placeholder]);

    useEffect(() => {
        if (blog != []) {
            setContent(blog.content); // Set content once blog is available
          }
        dispatch(clearError());
    }, [blog]);
    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);
    const onDrop = (acceptedFiles) => {

        try {
            setDroping(true);
            const file = acceptedFiles[0];
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewAvatar(reader.result);
            };
            reader.readAsDataURL(file);
            setDroping(false);
        } catch (error) {
            setFileUploadError(true);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/jpg': []
        }
    });

    const handleFileUpload = async (file) => {
        setFileUploadError(false);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadPercent(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData((prevFormData) => ({ ...prevFormData, featuredImage: downloadURL }));
                });
            }
        );
    };

    const options = [
        'Performance Marketing',
        'SEO',
        'Software',
        'UI & UX',
        'CRM'
    ];

    const setSelectedTags = (selectedTags) => {
        setFormData({
            ...formData,
            tags: selectedTags
        });
    };

    const handleChange = (e) => {
        let newFormData = { ...formData, [e.target.id]: e.target.value };
        setFormData(newFormData);
    }

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(blogSubmitStart());

            const updatedFormData = { ...formData, blogId: blog._id };
            const res = await fetch("/api/user/updateblog", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFormData),
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(blogSubmitFailure(data.message));
                setStatus(data.message);
                return;
            }

            dispatch(blogSubmitSuccess());
            setStatus("Blog is successfully updated.");

        } catch (error) {
            dispatch(blogSubmitFailure(error.message));
            console.log(error);
        }
    };

    return (
        <main className="w-11/12 py-20 md:py-40 mx-auto">
            <h1 className="text-3xl md:text-5xl text-center mb-16 font-semibold tracking-wide">Update a Blog</h1>
            <p className="text-xl md:text-2xl text-center mb-16 font-semibold tracking-wide">{status} </p>
            <form onSubmit={handleSubmit} className="flex gap-5 justify-between flex-col-reverse md:flex-row">
                <div className=' w-full md:w-1/4 min-h-44 h-fit shadow-md flex flex-col bg-white gap-5 p-3 md:p-3 rounded-sm'>
                    <h3 className="text-xl md:text-2xl text-center mb-5 font-semibold tracking-wide">Blog Details</h3>
                    <input placeholder='Blog title' required type="text" className="border w-full px-3 py-2 border-slate-400 rounded-md" defaultValue={blog.title || ""}
                        id="title" onChange={handleChange} />
                    <input placeholder='Author' required type="text" className="border w-full px-3 py-2 border-slate-400 rounded-md" defaultValue={blog.author}
                        id="author" onChange={handleChange} />
                    <MultiSelectUpdate options={options} onChange={setSelectedTags} defaultValue={blog.tags}/>

                    <h5 className='font-medium text-slate-800'>Featured image (landscape):</h5>
                    <img referrerPolicy="no-referrer" src={newAvatar} alt="profile" className="w-auto h-32 object-cover self-center shadow-sm" />
                    <div>
                        <div
                            {...getRootProps({
                                className:
                                    `dropzone flex flex-col justify-center px-12 w-full h-20 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`,
                            })}
                        >
                            <input {...getInputProps()} />
                            <ImageUpload />

                        </div>
                        {(uploadPercent !== 0) && <p><span className='cursor-pointer text-red-500 float-end'
                            onClick={() => { setNewAvatar(currentUser.avatar); setUploadPercent(0); }}>remove image</span> <span className='text-gray-500 text-right'>
                                Upload {uploadPercent}%</span></p>}
                        {fileUploadError && <span className='text-red-500 text-right'>Error, make sure image is less than 2MB</span>}

                    </div>



                    {
                        currentUser ? <button disabled={loading} className="bg-slate-700 text-white py-2 px-3 uppercase rounded-md
                hover:opacity-90 disabled:opacity-80 tracking-wide" >
                            {loading ? 'Submitting...' : 'Submit blog'}</button>
                            :
                            <Link to={"/login"}>
                                <button className="text-white tracking-wider gilroy-Bold hover:bg-white hover:text-slate-700 bg-slate-500 border-2 rounded-md border-slate-500 w-full p-2 ">
                                    Log in to publish a blog</button>
                            </Link>}
                </div>
                <div className="md:w-3/4 h-fit bg-white rounded-lg">
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1}
                        onBlur={newContent => setContent(newContent)}
                        onChange={newContent => {
                            setContent(newContent);
                            setFormData({
                                ...formData,
                                content: newContent,
                            });
                        }}
                        className='shadow-lg'
                    />
                </div>
            </form>
        </main>
    )
};

export default UpdateABlog;

import { useSelector } from 'react-redux';
import { FaPen } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ImageUpload from '../ImageUpload';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';


import { useDispatch } from 'react-redux';
import { logOutUserFailure, logOutUserStart, logOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../../redux/user/userSlice';


const Profile = () => {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [droping, setDroping] = useState(false);
    const [newAvatar, setNewAvatar] = useState(currentUser.avatar);
    const [uploadPercent, setUploadPercent] = useState(0);
    const [file, setFile] = useState(undefined);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();


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

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/jpg': []
        }
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

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
                    setFormData((prevFormData) => ({ ...prevFormData, avatar: downloadURL }));
                });
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
            dispatch(updateUserSuccess(data));
            setIsEditing(false);

        } catch (error) {
            dispatch(updateUserFailure(error.message));

        }

    };
    const handleLogOut = async () => {
        try {
            dispatch(logOutUserStart());
            const response = await fetch('/api/auth/logout');
            const data = await response.json();
            if (data.success === false) {
                dispatch(logOutUserFailure(data.message));
                return;
            }
            dispatch(logOutUserSuccess());
        } catch (error) {
            dispatch(logOutUserFailure(data.message));
        }
    }
    return (
        <div className="profile w-full md:w-4/12 shadow-md bg-custom-white md:p-11 p-5 rounded-lg flex flex-col gap-4 text-center">
            <span className="ms-auto">
                <button className="flex items-center gap-1  font-semibold" onClick={handleEditClick}>
                    {isEditing ? "Discard" : <> <FaPen fontSize="12px" /> Edit</>}
                </button>
            </span>
            <img referrerPolicy="no-referrer" src={isEditing ? newAvatar : currentUser.avatar} alt="profile" className="w-32 h-32 object-cover self-center shadow-lg rounded-full" />
            <div className="flex flex-col">
                {isEditing ? (
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <div className="flex justify-between items-center mb-3">
                            <span className='font-semibold'>Username: </span>
                            <input
                                type="text"
                                defaultValue={currentUser.username}
                                id='username'
                                onChange={handleChange}
                                className="input-field self-start w-56 px-0 py-1 ps-2 rounded-md"
                                placeholder="New Username"
                            />

                        </div>
                        <div className="flex justify-between items-center mb-3">
                            <span className='font-semibold'>password: </span>
                            <div className='flex flex-col  pt-8'>
                                <input
                                    type={
                                        showPassword ? "text" : "password"
                                    }
                                    id='password'
                                    onChange={handleChange}
                                    className="input-field self-start w-56 px-0 py-1 ps-2 rounded-md"
                                    placeholder="new password"
                                />
                                <span className='self-start'>
                                    <input type="checkbox" className='rounded-md focus:ring-offset-0 focus:ring-0' onChange={() =>
                                        setShowPassword((prev) => !prev)
                                    } /> show</span>
                            </div>
                        </div>
                        <div className="flex mt-3 align-middle items-center justify-between">
                            <span className='font-semibold'>Image:</span>
                            <div
                                {...getRootProps({
                                    className:
                                        'dropzone flex flex-col items-center justify-center w-56 h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100',
                                })}
                            >
                                <input {...getInputProps()} />
                                <ImageUpload />
                            </div>
                        </div>
                        {(uploadPercent !== 0) && <p className='text-gray-500 text-right'>Upload {uploadPercent}%</p>}
                        {fileUploadError && <span className='text-red-500 text-right'>Error, make sure image is less than 2MB</span>}
                        <button disabled={loading} type="submit" className="mt-5 ml-auto text-white save-button self-start border-solid border-2 rounded-md bg-slate-700 px-2 py-1">
                            {loading ? "Loading..." : "Update"}
                        </button>
                    </form>
                ) : (
                    <>
                        <span className="self-start px-1 py-1 font-semibold">Username: @{currentUser.username}</span>
                        <span className="self-start px-1 py-1 font-semibold">Email: {currentUser.email}</span>
                        <span onClick={handleLogOut} className="mt-4 font-medium text-red-700 p-1 px-2 border-2 hover:text-red-400 hover:border-red-400 border-red-500 rounded-md cursor-pointer self-end">
                            Log out
                        </span>
                    </>
                )}
            </div>
            <p className='text-red-500 text-xs'>{error ? error : ''}</p>
        </div >
    );
};

export default Profile;

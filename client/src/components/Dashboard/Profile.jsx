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
    const [isEditing, setIsEditing] = useState(true);
    const [droping, setDroping] = useState(false);
    const [newAvatar, setNewAvatar] = useState(currentUser.avatar);
    const [uploadPercent, setUploadPercent] = useState(0);
    const [file, setFile] = useState(undefined);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [resetKey, setResetKey] = useState(0)



    const handleDiscard = () => {
        setResetKey((prevKey) => (prevKey + 1));
    }

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
        if (newPassword !== confirmPassword) {
            alert('Confirm password should match the new password');
            return
        }

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
        <div className="profile w-full md:p-11 rounded-lg flex text-center justify-center shadow-lg bg-custom-white">

            <form key={resetKey} onSubmit={handleSubmit} className='flex flex-col gap-y-5 w-full p-5'>
                <div className="block md:flex justify-center gap-x-12 gap-y-5">
                    <div className="flex flex-col gap-y-5">
                        <img referrerPolicy="no-referrer" src={isEditing ? newAvatar : currentUser.avatar} alt="profile" className="w-32 h-32 object-cover self-center shadow-lg rounded-full" />
                        <div>
                            <div className="text-left ">
                                <div
                                    {...getRootProps({
                                        className:
                                            'dropzone flex flex-col items-center justify-between px-3 w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100',
                                    })}
                                >
                                    <input {...getInputProps()} />
                                    <ImageUpload />
                                </div>
                            </div>
                            {(uploadPercent !== 0) && <p className='text-gray-500 text-right'>Upload {uploadPercent}%</p>}
                            {fileUploadError && <span className='text-red-500 text-right'>Error, make sure image is less than 2MB</span>}
                        </div>
                    </div>
                    <div className="block md:flex md:flex-col lg:flex-row gap-x-10 gap-y-5 p-2">
                        <div className="flex flex-col gap-y-5">
                            <div className="text-left flex flex-col">
                                <span className='tracking-wide mb-2 text-sm text-gray-700'>Name </span>
                                <input
                                    type="text"
                                    defaultValue={currentUser.name}
                                    id='name'
                                    onChange={handleChange}
                                    className="input-field self-start w-full min-w-56 px-0 py-1 ps-2 rounded-md border border-slate-300"
                                    placeholder="Name"
                                />
                            </div>
                            <div className="text-left flex flex-col">
                                <span className='tracking-wide mb-2 text-sm text-gray-700'>Username </span>
                                <input
                                    type="text"
                                    defaultValue={currentUser.username}
                                    id='username'
                                    onChange={handleChange}
                                    className="input-field self-start w-full min-w-56 px-0 py-1 ps-2 rounded-md border border-slate-300"
                                    placeholder="New Username"
                                />
                            </div>
                            <div className="text-left flex flex-col">
                                <span className='tracking-wide mb-2 text-sm text-gray-700'>Email </span>
                                <input
                                    type="text"
                                    defaultValue={currentUser.email}
                                    id='email'
                                    onChange={handleChange}
                                    className="input-field self-start w-full min-w-56 px-0 py-1 ps-2 rounded-md border border-slate-300"
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-5'>

                            <div className=" text-left flex flex-col">
                                <span className='tracking-wide mb-2 text-sm text-gray-700'>Phone </span>
                                <input
                                    type="tel"
                                    defaultValue={currentUser.phone}
                                    id='phone'
                                    onChange={handleChange}
                                    className="input-field self-start w-full min-w-56 px-0 py-1 ps-2 rounded-md border border-slate-300"
                                    placeholder={currentUser.phone}
                                />

                            </div>
                            <div className="text-left flex flex-col">
                                <span className='tracking-wide mb-2 text-sm text-gray-700'> New password </span>
                                <div className='flex items-center justify-between w-full min-w-56 bg-white rounded-md py-1 px-2 border border-slate-300 focus-within:border-2 focus-within:border-black'>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        id='password'
                                        onChange={(e) => {
                                            handleChange(e);
                                            setNewPassword(e.target.value); // Set the new password value
                                        }}
                                        className="input-field outline-none "
                                        placeholder="new password"
                                    />
                                    {!showPassword ? <svg onClick={() => setShowPassword(!showPassword)} fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_8275675"><g fill="rgb(0,0,0)"><path clipRule="evenodd" d="m20.5303 4.53033c.2929-.29289.2929-.76777 0-1.06066s-.7677-.29289-1.0606 0l-16.00003 16.00003c-.29289.2929-.29289.7677 0 1.0606s.76777.2929 1.06066 0l2.8469-2.8469c1.3663.6432 2.93997 1.0666 4.62277 1.0666 2.684 0 5.0903-1.0771 6.8206-2.405.8668-.6653 1.5826-1.4074 2.0883-2.1361.4917-.7086.8411-1.4862.8411-2.2089s-.3494-1.5003-.8411-2.20885c-.5057-.72871-1.2215-1.47087-2.0883-2.13612-.2621-.20118-.5398-.39661-.8316-.5834zm-3.6308 3.6308-1.7708 1.77083c.3926.59284.6213 1.30374.6213 2.06804 0 2.0711-1.6789 3.75-3.75 3.75-.7643 0-1.4752-.2287-2.06804-.6213l-1.41672 1.4167c1.06553.4341 2.24686.7046 3.48476.7046 2.2865 0 4.3802-.9229 5.9073-2.095.7619-.5847 1.3641-1.2176 1.7693-1.8014.4191-.6039.5734-1.0763.5734-1.3536s-.1543-.7497-.5734-1.3536c-.4052-.5838-1.0074-1.21668-1.7693-1.80143-.3132-.24036-.6502-.47025-1.0078-.68384zm-5.8696 5.86957c.2938.1406.6227.2193.9701.2193 1.2426 0 2.25-1.0074 2.25-2.25 0-.3474-.0787-.6763-.2193-.9701z" fillRule="evenodd"></path><path d="m12 5.25c1.0323 0 2.0236.15934 2.9511.43101.1785.05227.2316.27561.1002.40709l-.8246.82455c-.0619.06186-.1515.08663-.2367.06702-.6394-.1471-1.3061-.22967-1.99-.22967-2.28655 0-4.38022.92292-5.90733 2.09497-.76189.58475-1.3641 1.21763-1.76924 1.80143-.41912.6039-.57343 1.0763-.57343 1.3536s.15431.7497.57343 1.3536c.35382.5099.85795 1.0571 1.48748 1.5771.11586.0957.1269.2708.02065.3771l-.70891.7089c-.09031.0903-.23442.0982-.33228.0162-.69298-.5812-1.27135-1.2074-1.69927-1.824-.49173-.7086-.8411-1.4862-.8411-2.2089s.34937-1.5003.8411-2.20885c.50571-.72871 1.22152-1.47087 2.08831-2.13612 1.73024-1.32795 4.13657-2.40503 6.82059-2.40503z"></path><path d="m12 8.25c.1185 0 .2357.00549.3513.01624.1969.01829.2681.25367.1283.39346l-1.2122 1.21226c-.6533.22484-1.1706.74214-1.39544 1.39544l-1.21226 1.2122c-.13979.1398-.37517.0686-.39346-.1283-.01075-.1156-.01624-.2328-.01624-.3513 0-2.07107 1.67893-3.75 3.75-3.75z"></path></g></svg>

                                        : <svg onClick={() => setShowPassword(!showPassword)} id="fi_2767194" enable-background="new 0 0 128 128" height="20" viewBox="0 0 128 128" width="20" xmlns="http://www.w3.org/2000/svg"><path id="Show" d="m64 104c-41.873 0-62.633-36.504-63.496-38.057-.672-1.209-.672-2.678 0-3.887.863-1.552 21.623-38.056 63.496-38.056s62.633 36.504 63.496 38.057c.672 1.209.672 2.678 0 3.887-.863 1.552-21.623 38.056-63.496 38.056zm-55.293-40.006c4.758 7.211 23.439 32.006 55.293 32.006 31.955 0 50.553-24.775 55.293-31.994-4.758-7.211-23.439-32.006-55.293-32.006-31.955 0-50.553 24.775-55.293 31.994zm55.293 24.006c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path></svg>

                                    }
                                </div>
                            </div>

                            <div className="text-left flex flex-col">
                                <span className='tracking-wide mb-2 text-sm text-gray-700'>Confirm new password </span>
                                <div className='flex items-center justify-between w-full min-w-56 bg-white rounded-md py-1 px-2 border border-slate-300 focus-within:border-2 focus-within:border-black'>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        id='password1'
                                        onChange={(e) => {
                                            handleChange(e);
                                            setConfirmPassword(e.target.value); // Set the new password value
                                        }}
                                        className="input-field outline-none focus:border-black"
                                        placeholder="new password"
                                    />
                                    {!showPassword ? <svg onClick={() => setShowPassword(!showPassword)} fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_8275675"><g fill="rgb(0,0,0)"><path clipRule="evenodd" d="m20.5303 4.53033c.2929-.29289.2929-.76777 0-1.06066s-.7677-.29289-1.0606 0l-16.00003 16.00003c-.29289.2929-.29289.7677 0 1.0606s.76777.2929 1.06066 0l2.8469-2.8469c1.3663.6432 2.93997 1.0666 4.62277 1.0666 2.684 0 5.0903-1.0771 6.8206-2.405.8668-.6653 1.5826-1.4074 2.0883-2.1361.4917-.7086.8411-1.4862.8411-2.2089s-.3494-1.5003-.8411-2.20885c-.5057-.72871-1.2215-1.47087-2.0883-2.13612-.2621-.20118-.5398-.39661-.8316-.5834zm-3.6308 3.6308-1.7708 1.77083c.3926.59284.6213 1.30374.6213 2.06804 0 2.0711-1.6789 3.75-3.75 3.75-.7643 0-1.4752-.2287-2.06804-.6213l-1.41672 1.4167c1.06553.4341 2.24686.7046 3.48476.7046 2.2865 0 4.3802-.9229 5.9073-2.095.7619-.5847 1.3641-1.2176 1.7693-1.8014.4191-.6039.5734-1.0763.5734-1.3536s-.1543-.7497-.5734-1.3536c-.4052-.5838-1.0074-1.21668-1.7693-1.80143-.3132-.24036-.6502-.47025-1.0078-.68384zm-5.8696 5.86957c.2938.1406.6227.2193.9701.2193 1.2426 0 2.25-1.0074 2.25-2.25 0-.3474-.0787-.6763-.2193-.9701z" fillRule="evenodd"></path><path d="m12 5.25c1.0323 0 2.0236.15934 2.9511.43101.1785.05227.2316.27561.1002.40709l-.8246.82455c-.0619.06186-.1515.08663-.2367.06702-.6394-.1471-1.3061-.22967-1.99-.22967-2.28655 0-4.38022.92292-5.90733 2.09497-.76189.58475-1.3641 1.21763-1.76924 1.80143-.41912.6039-.57343 1.0763-.57343 1.3536s.15431.7497.57343 1.3536c.35382.5099.85795 1.0571 1.48748 1.5771.11586.0957.1269.2708.02065.3771l-.70891.7089c-.09031.0903-.23442.0982-.33228.0162-.69298-.5812-1.27135-1.2074-1.69927-1.824-.49173-.7086-.8411-1.4862-.8411-2.2089s.34937-1.5003.8411-2.20885c.50571-.72871 1.22152-1.47087 2.08831-2.13612 1.73024-1.32795 4.13657-2.40503 6.82059-2.40503z"></path><path d="m12 8.25c.1185 0 .2357.00549.3513.01624.1969.01829.2681.25367.1283.39346l-1.2122 1.21226c-.6533.22484-1.1706.74214-1.39544 1.39544l-1.21226 1.2122c-.13979.1398-.37517.0686-.39346-.1283-.01075-.1156-.01624-.2328-.01624-.3513 0-2.07107 1.67893-3.75 3.75-3.75z"></path></g></svg>

                                        : <svg onClick={() => setShowPassword(!showPassword)} id="fi_2767194" enable-background="new 0 0 128 128" height="20" viewBox="0 0 128 128" width="20" xmlns="http://www.w3.org/2000/svg"><path id="Show" d="m64 104c-41.873 0-62.633-36.504-63.496-38.057-.672-1.209-.672-2.678 0-3.887.863-1.552 21.623-38.056 63.496-38.056s62.633 36.504 63.496 38.057c.672 1.209.672 2.678 0 3.887-.863 1.552-21.623 38.056-63.496 38.056zm-55.293-40.006c4.758 7.211 23.439 32.006 55.293 32.006 31.955 0 50.553-24.775 55.293-31.994-4.758-7.211-23.439-32.006-55.293-32.006-31.955 0-50.553 24.775-55.293 31.994zm55.293 24.006c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path></svg>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex self-end gap-x-5'>
                    <button type="discard" className=" text-white save-button  border-solid border-2 rounded-md bg-slate-700 px-2 py-1" onClick={handleDiscard}>
                        Discard
                    </button>
                    <button disabled={loading} type="submit" className=" text-white save-button  border-solid border-2 rounded-md bg-slate-700 px-2 py-1">
                        {loading ? "Loading..." : "Update"}
                    </button>
                </div>
            </form>
            <p className='text-red-500 text-xs'>{error ? error : ''}</p>

        </div >
    );
};

export default Profile;

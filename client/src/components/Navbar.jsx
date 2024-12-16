import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    clearError, logOutUserFailure, logOutUserStart,
    logOutUserSuccess, notificationFailure,
    notificationStart, notificationSuccess
} from "../redux/user/userSlice";
import Notifications from './Dashboard/Notifications';

const Navbar = () => {
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [showNotification, setShowNotification] = useState(false)


    if (showNotification) {
        const seenNotification = async () => {
            try {
                const res = await fetch('/api/user/seenotification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: currentUser._id }),

                });
                const data = await res.json();
                if (!data.success) {
                    console.log("error")
                }
                dispatch(notificationSuccess(data.data));
            } catch (error) {
                console.log(error)
            }
        }
        seenNotification()
    }


    const [avatarKey, setAvatarKey] = useState(Date.now());
    useEffect(() => {
        if (currentUser) {
            setAvatarKey(Date.now());
            dispatch(clearError());
            const getAllNotifications = async () => {
                try {
                    dispatch(notificationStart());
                    const res = await fetch(`/api/user/get-all-notification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId: currentUser._id }),
                    });
                    const data = await res.json();
                    if (data.success === false) {
                        dispatch(notificationFailure(data.message));
                        return;
                    }
                    dispatch(notificationSuccess(data.data));

                } catch (error) {
                    dispatch(notificationFailure(error.message));
                }
            }
            getAllNotifications();



        }

    }, []);


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
        <nav className="bg-white ">
            {currentUser ? <Notifications showNotification={showNotification} onClose={() => setShowNotification(false)} /> : ''}
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1 gilroy-bold text-md">

                <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
                    <ul className="flex flex-col items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg
                     md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">

                        <li><Link to={"/allconsultants/All"} className="block  md:hover:text-slate-700 py-2 px-3  md:border-0 
                            md:p-0 text-black">
                            Consultants</Link>
                        </li>
                        <li><Link to={"/agencies"} className="block py-2 px-3 md:border-0 
                            md:p-0 md:hover:text-slate-700 text-black">
                            Agencies</Link>
                        </li>

                        <li className="relative navDropdown1">
                            <button className="text-black flex items-center focus:outline-none hover:text-gray-900">
                                Categories
                                <svg className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-.707.293z" />
                                </svg>
                            </button>
                            <div className="absolute dropdownPopup right-0 mt-2 w-fit bg-white rounded-md shadow-lg text-sm py-1 opacity-0 transition duration-300 transform scale-y-0 origin-top">
                                <Link to={"/allconsultants/Performance Marketing"} className="block px-2 py-1 font-semibold text-black hover:bg-gray-100 text-nowrap">Performance Marketing</Link>
                                <Link to={"/allconsultants/UI UX"} className="block px-2 py-1 font-semibold text-black hover:bg-gray-100">UI UX</Link>
                                <Link to={"/allconsultants/Brand Strategy"} className="block px-2 py-1 font-semibold text-black hover:bg-gray-100">Brand Strategy</Link>
                                <Link href="#" className="block px-2 py-1 font-semibold text-black hover:bg-gray-100">CRM</Link>
                            </div>

                        </li>
                        <li className="block cursor-pointer md:hover:text-slate-700 py-2 px-3 md:border-0 
                             md:p-0 text-black"
                            onClick={() => setShowNotification(!showNotification)}
                        >
                            <span>Inbox</span>{currentUser && currentUser.notification && <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium rounded-full bg-blue-900 text-white">{currentUser.notification.length - currentUser.seenNotification.length}</span>}

                        </li>
                        {
                            currentUser ?
                                <li className="relative navDropdown1">
                                    <button className="text-black flex items-center focus:outline-none hover:text-gray-900">
                                        <img referrerPolicy="no-referrer" src={currentUser.avatar} key={avatarKey} alt="dashboard" className="rounded-full h-7 w-7 object-cover" />
                                        <svg className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-.707.293z" />
                                        </svg>
                                    </button>
                                    <div className="absolute dropdownPopup right-0 mt-2 w-fit bg-white rounded-md shadow-lg text-sm py-1 opacity-0 transition duration-300 transform scale-y-0 origin-top">

                                        <a>
                                            <span className="block px-2 pt-1 pb-2 text-black hover:bg-gray-100">@{currentUser.username}</span>
                                        </a>
                                        <Link to={"/dashboard"} className="block px-2 py-1 font-semibold text-black hover:bg-gray-100">

                                            Dashboard
                                        </Link>

                                        <div className="py-1" onClick={handleLogOut}>
                                            <Link to={"/"} className="block px-2 py-1 text-sm text-black  font-semibold hover:bg-gray-100">
                                                Log out
                                            </Link>
                                        </div>

                                    </div>
                                </li>

                                :
                                <Link to={"/login"}>
                                    <li className="text-white tracking-wider gilroy-Bold hover:bg-white hover:text-slate-700 bg-slate-500 border-2 rounded-md border-slate-500 w-24 p-2 ">
                                        Log In
                                    </li></Link>
                        }
                    </ul>

                </div>
            </div>
        </nav >
    )
};

export default Navbar;
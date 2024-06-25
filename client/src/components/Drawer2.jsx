// src/Drawer.js
import React, { useState, useEffect } from 'react';
import { RiMenuUnfold4Line } from "react-icons/ri";
import { FaUser, FaBell, FaAddressCard, FaUserTie, FaLayerGroup, FaHome } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import DrawerLogo from '../assets/drawerLogo.png';
import { logOutUserFailure, logOutUserStart, logOutUserSuccess, notificationFailure, notificationStart, notificationSuccess } from "../redux/user/userSlice";

const Drawer2 = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);



    useEffect(() => {
        if (currentUser) {
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
            };
            getAllNotifications();
            const intervalId = setInterval(getAllNotifications, 15000);

            return () => clearInterval(intervalId);
        }
    }, [currentUser && currentUser.notification.length]);

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
            dispatch(logOutUserFailure(error.message));
        }
    };

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <>
            <div className="text-center">
                <button
                    className="text-slate-900 rounded-lg text-sm px-5 py-2.5"
                    type="button"
                    onClick={toggleDrawer}
                >
                    <RiMenuUnfold4Line fontSize="35px" />
                </button>
            </div>

            <div className={`fixed inset-0 z-40 flex ${isOpen ? '' : 'pointer-events-none'}`}>
                {/* Overlay */}
                <div
                    className={`fixed inset-0 bg-black opacity-0 transition-opacity ${isOpen ? 'opacity-50' : 'opacity-0'}`}
                    onClick={toggleDrawer}
                ></div>

                {/* Drawer */}
                <div
                    className={`fixed top-0 left-0 h-101 w-80 bg-gray-800 shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <img src={DrawerLogo} alt="drawer logo" className="w-40 h-auto mt-4 ml-4" />
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center hover:bg-gray-600 hover:text-white"
                        onClick={toggleDrawer}
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close menu</span>
                    </button>
                    <div className="py-8 pb-16 px-4 overflow-y-auto h-95 flex flex-col justify-between">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link to={"/"} onClick={toggleDrawer} className="flex mobileMenuLink items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                    <FaHome className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" />
                                    <span className="ml-3">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/allconsultants"} onClick={toggleDrawer} className="flex mobileMenuLink items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                    <FaUserTie className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" />
                                    <span className="ml-3 whitespace-nowrap">All consultants</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/applyconsultant"} onClick={toggleDrawer} className="flex mobileMenuLink items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                    <FaAddressCard className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" />
                                    <span className="ml-3 whitespace-nowrap">Become a Consultant</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/dashboard"} onClick={toggleDrawer} className="flex items-center mobileMenuLink p-2 rounded-lg text-white hover:bg-gray-700 group">
                                    <FaBell className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" />
                                    <span className="flex justify-between w-full ml-3 whitespace-nowrap">Notifications</span>
                                    {currentUser && (
                                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium rounded-full bg-blue-900 text-blue-300">
                                            {currentUser.notification.length}
                                        </span>
                                    )}
                                </Link>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-slate-700 hover:text-white"
                                    onClick={toggleDropdown}
                                >
                                    <FaLayerGroup className="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white" />
                                    <span className="flex-1 ml-3 text-left whitespace-nowrap">Categories</span>
                                    <svg
                                        className={`w-3 h-3 ml-2 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </button>
                                <ul id="dropdown-example" className={`${isDropdownOpen ? 'block' : 'hidden'} py-2 space-y-2`}>
                                    <li>
                                        <Link to={"/"} onClick={toggleDrawer} className="flex mobileMenuLink items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-slate-700">
                                            Performance Marketing
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/"} onClick={toggleDrawer} className="flex mobileMenuLink items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-slate-700">
                                            UI UX
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/"} onClick={toggleDrawer} className="flex mobileMenuLink items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-slate-700">
                                            SEO
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/"} onClick={toggleDrawer} className="flex mobileMenuLink items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-slate-700">
                                            CRM
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link to={"/dashboard"} onClick={toggleDrawer} className="flex mobileMenuLink items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                    {currentUser ? (
                                        <img
                                            referrerPolicy="no-referrer"
                                            className="flex-shrink-0 rounded-full w-6 h-6 transition duration-75 text-gray-500 group-hover:text-gray-900"
                                            src={currentUser.avatar}
                                            alt="User Avatar"
                                        />
                                    ) : (
                                        <FaUser className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-500 group-hover:text-gray-900" />
                                    )}
                                    <span className="ml-3 whitespace-nowrap">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                {currentUser ? (
                                    <Link to={"/"} className="flex mobileMenuLink items-center p-2 rounded-lg text-white hover:bg-gray-700 group" onClick={(e) => {
                                        handleLogOut();
                                        toggleDrawer();
                                    }}>
                                        <svg
                                            className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 18 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                                            />
                                        </svg>
                                        <span className="ml-3 whitespace-nowrap">Log out</span>
                                    </Link>
                                ) : (
                                    <Link to={"/login"} onClick={toggleDrawer} className="flex mobileMenuLink items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                        <svg
                                            className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 18 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                                            />
                                        </svg>
                                        <span className="ml-3 whitespace-nowrap">Log In</span>
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Drawer2;

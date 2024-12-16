import { useEffect, useState } from 'react';
import Notifications from '../components/Dashboard/Notifications';
import Profile from '../components/Dashboard/Profile';
import ReviewDashboard from '../components/Dashboard/ReviewDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../redux/user/userSlice';
import Consultations from '../components/Dashboard/ConsultDashboard';
import AdminControls from '../components/Dashboard/AdminControls';
import ConsultantDetails from '../components/Dashboard/ConsultantDetails';
import UserBlog from '../components/Dashboard/UserBlogs';
import { FiHome, FiCompass, FiSettings } from 'react-icons/fi';

const Dashboard = () => {
    const { currentUser } = useSelector(state => state.user);

    const [isOpen, setIsOpen] = useState(true);
    const [selectedOption, setSelectedOption] = useState('Home');

    return (
        <div className="flex flex-col md:flex-row md:pt-20">
            {/* Sidebar for larger screens */}
            <div className={`bg-gray-900 text-white ${isOpen ? 'w-64' : 'w-16'} transition-width duration-300 hidden md:block`}>
                <div className="flex items-center justify-between p-4">
                    <h1 className={`tracking-wide text-lg ${!isOpen && 'hidden'}`}>Dashboard</h1>
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? '⟨' : '⟩'}
                    </button>
                </div>

                <nav className="mt-10 space-y-4">
                    <SidebarItem label="Profile" icon={<FiHome />} isOpen={isOpen} onClick={() => setSelectedOption('Home')} />
                    {currentUser.isConsultant && <SidebarItem label="Consultant Profile" icon={<FiCompass />} isOpen={isOpen} onClick={() => setSelectedOption('Consultant')} />}
                    {currentUser.blogs.length > 0 && <SidebarItem label="Blogs" icon={<FiSettings />} isOpen={isOpen} onClick={() => setSelectedOption('Blogs')} />}
                    {currentUser && currentUser.isAdmin === true && <SidebarItem label="Admin Controls" icon={<FiSettings />} isOpen={isOpen} onClick={() => setSelectedOption('Admin')} />}
                </nav>
            </div>

            {/* Tabs for mobile screens */}
            <div className="block md:hidden bg-gray-900 text-white">
                <nav className="flex justify-around p-2">
                    <TabItem label="Profile" icon={<FiHome />} selected={selectedOption === 'Home'} onClick={() => setSelectedOption('Home')} />
                    {currentUser.isConsultant && <TabItem label="Consultant" icon={<FiCompass />} selected={selectedOption === 'Consultant'} onClick={() => setSelectedOption('Consultant')} />}
                    {currentUser.blogs.length > 0 && <TabItem label="Blogs" icon={<FiSettings />} selected={selectedOption === 'Blogs'} onClick={() => setSelectedOption('Blogs')} />}
                    {currentUser && currentUser.isAdmin === true && <TabItem label="Admin" icon={<FiSettings />} selected={selectedOption === 'Admin'} onClick={() => setSelectedOption('Admin')} />}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 min-h-screen">
                <ContentDisplay selectedOption={selectedOption} />
            </div>
        </div>
    );
};

const SidebarItem = ({ label, icon, isOpen, onClick }) => (
    <div onClick={onClick} className="flex items-center space-x-4 p-3 hover:bg-gray-700 cursor-pointer">
        {icon}
        {isOpen && <span>{label}</span>}
    </div>
);

const TabItem = ({ label, icon, selected, onClick }) => (
    <div onClick={onClick} className={`flex flex-col items-center cursor-pointer pb-1 ${selected ? 'border-b-2 border-white' : ''}`}>
        {icon}
        <span className="text-xs">{label}</span>
    </div>
);

const ContentDisplay = ({ selectedOption }) => {
    return (
        <div>
            {selectedOption === 'Home' && <Profile />}
            {selectedOption === 'Consultant' && <ConsultantDetails />}
            {selectedOption === 'Blogs' && <UserBlog />}
            {selectedOption === 'Admin' && <AdminControls />}
        </div>
    );
};

export default Dashboard;


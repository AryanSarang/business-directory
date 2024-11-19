
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
        <div className="flex h-screen md:pt-20 ">
            {/* Sidebar */}
            <div className={`bg-gray-900 text-white ${isOpen ? 'w-64' : 'w-16'} transition-width duration-300`}>
                <div className="flex items-center justify-between p-4">
                    <h1 className={`font-bold text-lg ${!isOpen && 'hidden'}`}>Explore GPTs</h1>
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
                    {currentUser.blogs.length>0 && <SidebarItem label="Blogs" icon={<FiSettings />} isOpen={isOpen} onClick={() => setSelectedOption('Blogs')} />}
                    {currentUser && currentUser.isAdmin === true && <SidebarItem label="Admin" icon={<FiSettings />} isOpen={isOpen} onClick={() => setSelectedOption('Admin')} />}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-gray-100 p-6 overflow-auto">
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

const ContentDisplay = ({ selectedOption }) => {
    return (
        <div>
            {selectedOption === 'Home' && <Profile/>}
            {selectedOption === 'Consultant' && <ConsultantDetails />}
            {selectedOption === 'Blogs' && <UserBlog />}
            {selectedOption === 'Admin' && <AdminControls />}
        </div>
    );
};
export default Dashboard;


{/* <main className="w-11/12 py-20 md:py-40 mx-auto">
            <div className="upper flex mb-5 gap-5 flex-col md:flex-row justify-between">
\                
                <Profile />
            </div>
            <div className='flex mb-5 gap-5 flex-col md:flex-row '>
                {currentUser.isConsultant && }
                {currentUser.blogs.length>0 &&  }
            </div>
            {currentUser && currentUser.isAdmin === true && <AdminControls />}
        </main> */}
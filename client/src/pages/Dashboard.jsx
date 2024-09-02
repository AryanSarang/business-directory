
import { useEffect, useState } from 'react';
import Notifications from '../components/Dashboard/Notifications';
import Profile from '../components/Dashboard/Profile';
import ReviewDashboard from '../components/Dashboard/ReviewDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../redux/user/userSlice';
import Consultations from '../components/Dashboard/ConsultDashboard';
import AdminControls from '../components/Dashboard/AdminControls';


const Dashboard = () => {
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearError());
    }, []);

    return (
        <main className="w-11/12 py-20 md:py-40 mx-auto">
            <div className="upper flex mb-5 gap-5 flex-col md:flex-row justify-between">
                <Notifications />
                <Consultations />
                <Profile />
            </div>
            {/* <ReviewDashboard /> */}
            {currentUser && currentUser.isAdmin === true && <AdminControls />}
        </main>
    );
};

export default Dashboard;

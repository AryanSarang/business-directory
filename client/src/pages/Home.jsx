import { useEffect } from 'react';
import HowItWorks from "../components/HomePage/HowItWorks";
import { useDispatch } from 'react-redux';
import { clearError } from '../redux/user/userSlice';
import BannerImg from '../components/HomePage/Banner.img';
import Services from '../components/HomePage/Services';
import Testimonials from '../components/HomePage/Testimonials';

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearError());
    }, []);
    return (
        <main className="md:pt-12 ">
            <BannerImg />
            <Services />
            <HowItWorks />
            <Testimonials />
        </main>

    )
};

export default Home;



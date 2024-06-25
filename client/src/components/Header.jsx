import logo from '../assets/logo.png';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Drawer from './Drawer';
import useWindowWidth from '../Miscellaneous/useWindowWidth';
import { useEffect } from 'react';
import Drawer2 from './Drawer2';


const Header = () => {
    const windowWidth = useWindowWidth();

    useEffect(() => {
        const handleScroll = () => {
            const header = document.getElementById('header');
            if (window.scrollY > 5) {
                header.classList.add('headerShadow');
            } else {
                header.classList.remove('headerShadow');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className="bg-white w-full z-10  md:fixed text-center" id="header">
            <div className="flex h-20 justify-between md:items-center max-w-7xl mx-auto ">
                <Link to={"/"} className='p-2'>
                    <img src={logo} className="h-16 min-w-24 my-auto" alt="business directory" />
                </Link>

                <div className='my-auto'>
                    {windowWidth >= 900 ? <Navbar /> : <Drawer2 />}
                </div>
            </div>
        </header>
    )
};

export default Header;

import { useNavigate } from 'react-router-dom';

const CardAllConsultant = ({ consultant }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/consultant/${consultant._id}`);
        setTimeout(() => {
            const element = document.getElementById('formDiv');
            if (element) {
                element.scrollIntoView({ block: 'start' });
            }
        }, 100)
    };
    return (
        <div className="w-full relative basis-1/1 mx-auto py-5 md:basis-1/3 shrink-0 p-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
            <div className="ribbon"><span>{consultant.badge !== "none" && consultant.badge}</span></div>
            <div className="text-right">
                <span className="font-semibold bg-gray-200 px-1">Rs. {consultant.feesPerConsultation}/hour</span>
            </div>
            <div className="flex flex-col items-center py-3">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={consultant.avatar} alt={consultant.name} />
                <span className="mb-1 flex gap-1 items-center text-xl font-medium text-gray-900 gilroy-bold">{consultant.name}
                    <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" id="Layer_1" enableBackground="new 0 0 120 120" height="512" viewBox="0 0 120 120" width="512"><g>
                        <path d="m99.5 52.8-1.9 4.7c-.6 1.6-.6 3.3 0 4.9l1.9 4.7c1.1 2.8.2 6-2.3 7.8l-4.2 2.9c-1.4 1-2.3 2.5-2.7 4.1l-.9 5c-.6 3-3.1 5.2-6.1 5.3l-5.1.2c-1.7.1-3.3.8-4.5 2l-3.5 3.7c-2.1 2.2-5.4 2.7-8 1.2l-4.4-2.6c-1.5-.9-3.2-1.1-4.9-.7l-5 1.2c-2.9.7-6-.7-7.4-3.4l-2.3-4.6c-.8-1.5-2.1-2.7-3.7-3.2l-4.8-1.6c-2.9-1-4.7-3.8-4.4-6.8l.5-5.1c.2-1.7-.3-3.4-1.4-4.7l-3.2-4c-1.9-2.4-1.9-5.7 0-8.1l3.2-4c1.1-1.3 1.6-3 1.4-4.7l-.5-5.1c-.3-3 1.5-5.8 4.4-6.8l4.8-1.6c1.6-.5 2.9-1.7 3.7-3.2l2.3-4.6c1.4-2.7 4.4-4.1 7.4-3.4l5 1.2c1.6.4 3.4.2 4.9-.7l4.4-2.6c2.6-1.5 5.9-1.1 8 1.2l3.5 3.7c1.2 1.2 2.8 2 4.5 2l5.1.2c3 .1 5.6 2.3 6.1 5.3l.9 5c.3 1.7 1.3 3.2 2.7 4.1l4.2 2.9c2.5 2.2 3.5 5.4 2.3 8.2z" fill="#00d566" />
                        <g opacity=".15"><path d="m43.4 93.5-2.3-4.6c-.8-1.5-2.1-2.7-3.7-3.2l-4.8-1.6c-2.9-1-4.7-3.8-4.4-6.8l.5-5.1c.2-1.7-.3-3.4-1.4-4.7l-3.2-4c-1.9-2.4-1.9-5.7 0-8.1l3.2-4c1.1-1.3 1.6-3 1.4-4.7l-.5-5.1c-.3-3 1.5-5.8 4.4-6.8l4.8-1.6c1.6-.5 2.9-1.7 3.7-3.2l2.3-4.6c.8-1.6 2.2-2.7 3.7-3.2-2.7-.4-5.4 1-6.6 3.5l-2.3 4.6c-.8 1.5-2.1 2.7-3.7 3.2l-4.8 1.6c-2.9 1-4.7 3.8-4.4 6.8l.5 5.1c.2 1.7-.3 3.4-1.4 4.7l-3.2 4c-1.9 2.4-1.9 5.7 0 8.1l3.2 4c1.1 1.3 1.6 3 1.4 4.7l-.5 5.1c-.3 3 1.5 5.8 4.4 6.8l4.8 1.6c1.6.5 2.9 1.7 3.7 3.2l2.3 4.6c1.4 2.7 4.4 4.1 7.4 3.4l.6-.1c-2.2-.4-4.1-1.6-5.1-3.6z" />
                            <path d="m60.6 22.5 4.4-2.6c.4-.2.8-.4 1.2-.5-1.4-.2-2.9.1-4.1.8l-4.4 2.6c-.4.2-.8.4-1.2.5 1.4.2 2.8 0 4.1-.8z" /><path d="m81 92c-.5 0-1 .1-1.4.2l3.6-.2c.5 0 .9-.1 1.4-.2z" />
                            <path d="m65 98.9-4.4-2.6c-1.5-.9-3.2-1.1-4.9-.7l-.6.1c.9.1 1.7.4 2.5.8l4.4 2.6c1.7 1 3.6 1.1 5.4.5-.8 0-1.6-.2-2.4-.7z" /></g>
                        <path d="m44 53.6 12.5 14.3 25.6-20.6" fill="#00d566" />
                        <path d="m53.5 75.3c-1.4 0-2.8-.6-3.8-1.7l-12.5-14.3c-1.8-2.1-1.6-5.2.4-7.1 2.1-1.8 5.2-1.6 7.1.4l9.4 10.7 21.9-17.6c2.1-1.7 5.3-1.4 7 .8s1.4 5.3-.8 7l-25.6 20.7c-.9.7-2 1.1-3.1 1.1z" fill="#fff" /></g>
                    </svg>
                </span>

                <span className="text-sm text-gray-700 gilroy-bold">{consultant.specialization}</span>
                <span className="text-sm text-gray-700 gilroy-bold">Experience: {consultant.experienceYear} years</span>

                <div className="flex mt-4 gap-3 md:mt-6">
                    <a onClick={handleClick} className="inline-flex items-center px-6 py-2 text-sm tracking-wider cursor-pointer font-medium text-center text-white bg-green-700 rounded-md hover:shadow-sm hover:shadow-green-300 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">Book</a>
                    <a onClick={() => navigate(`/consultant/${consultant._id}`)} className="py-2 px-6 ms-2 text-sm cursor-pointer tracking-wider font-semibold text-slate-700 focus:outline-none bg-white rounded-md border hover:shadow-md hover:shadow-gray-300 border-gray-500 hover:bg-gray-100 hover:text-slate-900 focus:z-10 focus:ring-4 focus:ring-gray-100">Profile</a>
                </div>
                <span className="text-sm text-gray-700 mt-5 px-5 line-clamp-3 font-semibold overflow-hidden gilroy-light" >
                    {consultant.experience}<br />
                </span>
            </div>
            <div className='flex justify-between px-5 items-center'>
                <div className="flex flex-col align-middle text-center">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 text-slate-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg className="w-4 h-4 text-slate-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg className="w-4 h-4 text-slate-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg className="w-4 h-4 text-slate-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg className="w-4 h-4 text-slate-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                    </div>
                </div>
                <span className='font-normal'>Orders: 104</span>
            </div>
        </div>
    )
};

export default CardAllConsultant;

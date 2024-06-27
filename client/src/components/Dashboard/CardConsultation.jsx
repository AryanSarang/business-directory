
import moment from 'moment';


const CardConsultation = ({ consultant, onClickPath, timeStamp, date, status }) => {

    return (
        <div className="bg-white px-4 pt-4 shadow-md rounded-lg hover:bg-gray-100 transition duration-300 relative">

            <a href={onClickPath} className="no-underline">
                <p className="text-gray-800 mt-5 mb-2 text-left">On <span className='gilroy-bold'>{date}</span> by <span className='gilroy-bold'>{consultant}</span>
                </p>
                <h6 className='text-left mt-2 mb-4'>Status: {status}</h6>
            </a>

            <span className="text-gray-500 select-none text-sm absolute top-1 right-1 mt-1 mr-1">
                {moment(timeStamp).fromNow(true)}
            </span>

        </div>
    )
};

export default CardConsultation;

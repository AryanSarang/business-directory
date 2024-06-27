
import moment from 'moment';

const CardNotification = ({ message, onClickPath, timeStamp }) => {
    return (
        <div className="bg-white px-4 pt-4 shadow-md rounded-lg hover:bg-gray-100 transition duration-300 relative">
            <a href={onClickPath} className="no-underline">
                <p className="text-gray-800 my-5 text-left">{message}</p>
            </a>
            <span className="text-gray-500 select-none text-sm absolute top-1 right-1 mt-1 mr-1">
                {moment(timeStamp).fromNow(true)}
            </span>
        </div>
    )
};

export default CardNotification;

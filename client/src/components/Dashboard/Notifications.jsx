import { useSelector } from 'react-redux';

import CardNotification from './CardNotification';


const Notifications = ({ showNotification, onClose }) => {

    const { currentUser } = useSelector((state) => state.user);
    // console.log(currentUser.seenNotification.length)

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose()
    }

    if (!showNotification) {
        return null
    }

    return (<div id='wrapper' className='z-50 fixed inset-0 flex justify-center md:items-center' onClick={handleClose}>
        <div className='relative  w-[100%] md:w-4/12 bg-custom-white shadow-md md:px-5 md:py-3 p-2 rounded-lg  text-center'>
            <div className=" w-full flex flex-col gap-4">
                <h4 className='text-2xl gilroy-bold tracking-wide'>Notifications</h4>
                <span className='absolute md:hidden right-3 top-2 cursor-pointer' onClick={() => onClose()}>&#10006;</span>
                <div className="w-full flex flex-col gap-6 overflow-scroll overflow-x-hidden bg-gray-200 notifications">
                    {currentUser && currentUser.notification && currentUser.notification.length > 0 ?
                        (
                            currentUser.notification.slice().reverse().map((notificationMsg, index) => (
                                <CardNotification key={index}
                                    message={notificationMsg.message}
                                    onClickPath={notificationMsg.data ? notificationMsg.data.onClickPath : undefined}
                                    timeStamp={notificationMsg.timestamp}
                                />
                            ))
                        ) : (<p className='text-slate-800 m-auto text-xl'>No notifications</p>)}

                </div>
            </div>

        </div>
    </div>
    )
};

export default Notifications;


{/* <div className=' w-full md:w-4/12 shadow-md bg-custom-white md:px-11 md:py-3 p-5 rounded-lg  text-center'>

<div className="w-full flex flex-col gap-4">
    <h4 className='text-2xl gilroy-bold mb-3 tracking-wide'>Notifications</h4>
    <div className="w-full flex flex-col gap-6 overflow-scroll overflow-x-hidden  bg-gray-200 notifications">
        {currentUser && currentUser.notification && currentUser.notification.length > 0 ?
            (
                currentUser.notification.slice().reverse().map((notificationMsg, index) => (
                    <CardNotification key={index}
                        message={notificationMsg.message}
                        onClickPath={notificationMsg.data ? notificationMsg.data.onClickPath : undefined}
                        timeStamp={notificationMsg.timestamp}
                    />
                ))
            ) : (<p className='text-slate-800 m-auto text-xl'>No notifications</p>)}

    </div>
</div>

</div> */}
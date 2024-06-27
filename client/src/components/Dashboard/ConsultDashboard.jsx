import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CardConsultation from './CardConsultation';

const Consultations = () => {
    const { currentUser, loading, error } = useSelector((state) => state.user);

    return (
        <div className=' w-full md:w-4/12 shadow-md bg-custom-white md:px-11 md:py-3 p-5 rounded-lg  text-center'>

            <div className="w-full flex flex-col gap-4">
                <h4 className='text-2xl gilroy-bold mb-3 tracking-wide'>Consultations</h4>
                <div className="w-full flex flex-col gap-6 overflow-scroll overflow-x-hidden bg-gray-200 notifications">
                    {currentUser && currentUser.consultation && currentUser.consultation.length > 0 ?
                        (
                            currentUser.consultation.slice().reverse().map((SingleConsultation, index) => (

                                <CardConsultation key={index}
                                    consultant={SingleConsultation.consultant}
                                    status={SingleConsultation.status}
                                    onClickPath={SingleConsultation.data ? SingleConsultation.data.onClickPath : undefined}
                                    timeStamp={SingleConsultation.timestamp}
                                    date={SingleConsultation.date}
                                />

                            ))
                        ) : (<p className='text-slate-800 m-auto text-xl'>No consultations</p>)}

                </div>
            </div>

        </div>
    )
};

export default Consultations;

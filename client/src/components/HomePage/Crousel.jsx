
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative, Autoplay } from 'swiper/modules';
import person1 from '../../assets/pngegg.png';
import 'swiper/css/autoplay';

const Crousel = () => {
    return (
        <>
            <Swiper
                grabCursor={true}
                effect={'creative'}
                creativeEffect={{
                    prev: {
                        translate: [0, 0, -4500],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                }}
                modules={[EffectCreative, Autoplay]}
                className="mySwiper h-auto w-full md:w-9/12"
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: true }}
            >
                <SwiperSlide className='swiperSlides person1slide flex flex-col bg-white md:px-5'>
                    <img className=' w-3/4 md:w-4/6' src={person1} alt="performance marketing expert" />
                    <div className='flex justify-between align-middle items-center bg-white w-full
                     text-black px-5 py-5 rounded-2xl md:m-5 my-5 me-2 mt-0 shadow-lg'>
                        <div>
                            <h3 className='text-lg font-medium'>Loreum Ipsum 1</h3>
                            <h5 className='text-sm font-bold'>Performance Marketing expert</h5>
                        </div>
                        <div>
                            <button className='text-xs  text-white p-2 px-3 font-semibold rounded-md bg-slate-500 hover:border-2 hover:bg-white hover:border-slate-500 hover:text-slate-500'>
                                Connect
                            </button>
                        </div>
                    </div>

                </SwiperSlide>
                <SwiperSlide className='swiperSlides person1slide flex flex-col bg-slate-300 md:px-5'>
                    <img className=' w-3/4 md:w-4/6' src={person1} />
                    <div className='flex justify-between align-middle items-center bg-white w-full
                     text-black px-5 py-5 rounded-2xl md:m-5 my-5 me-2 mt-0 shadow-lg'>
                        <div>
                            <h3 className='text-lg font-medium'>Loreum Ipsum 2</h3>
                            <h5 className='text-sm font-bold'>Performance Marketing expert</h5>
                        </div>
                        <div>
                            <button className='text-xs text-white p-2 px-3 font-semibold rounded-md bg-slate-500 hover:border-2 hover:bg-white hover:border-slate-500 hover:text-slate-500'>
                                Connect
                            </button>
                        </div>
                    </div>

                </SwiperSlide>
                <SwiperSlide className='swiperSlides person1slide flex flex-col bg-slate-300 md:px-5'>
                    <img className=' w-3/4 md:w-4/6' src={person1} />
                    <div className='flex justify-between align-middle items-center bg-white w-full
                     text-black px-5 py-5 rounded-2xl md:m-5 my-5 me-2 mt-0  shadow-lg'>
                        <div>
                            <h3 className='text-lg font-medium'>Loreum Ipsum 3</h3>
                            <h5 className='text-sm font-bold'>Performance Marketing expert</h5>
                        </div>
                        <div>
                            <button className='text-xs text-white p-2 px-3 font-semibold rounded-md bg-slate-500 hover:border-2 hover:bg-white hover:border-slate-500 hover:text-slate-500'>
                                Connect
                            </button>
                        </div>
                    </div>

                </SwiperSlide>
            </Swiper>
        </>
    )
};

export default Crousel;

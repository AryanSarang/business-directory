import React, { useRef, useState } from 'react';
import star from '../../assets/star.png';
import starHalf from '../../assets/half-star.png';
import Anuj from '../../assets/Clients/Anuj.webp';
import Sonam from '../../assets/Clients/Sonam.webp';
import Randeep from '../../assets/Clients/Randeep.webp';
import Sanjana from '../../assets/Clients/Sanjana.webp';
import Payal from '../../assets/Clients/Payal.webp';
import Manish from '../../assets/Clients/Manish.webp';
import Madhav from '../../assets/Clients/Madhav.webp';
import Kriti from '../../assets/Clients/Kriti.webp';
import Akanksha from '../../assets/Clients/Akanksha.webp';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';



const Testimonials = () => {
    const starRating5 = () => {
        return (
            <div className="flex">
                <img src={star} alt="star" className="w-4 h-[14px]" />
                <img src={star} alt="star" className="w-4 h-4" />
                <img src={star} alt="star" className="w-4 h-4" />
                <img src={star} alt="star" className="w-4 h-4" />
                <img src={star} alt="star" className="w-4 h-4" />
            </div>
        )
    }
    const starRating4half = () => {
        return (
            <div className="flex">
                <img src={star} alt="star" className="w-4 h-4" />
                <img src={star} alt="star" className="w-4 h-4" />
                <img src={star} alt="star" className="w-4 h-4" />
                <img src={star} alt="star" className="w-4 h-4" />
                <img src={starHalf} alt="starHalf" className="w-4 h-4" />
            </div>
        )
    }
    const starRating4 = () => {
        return (
            <div className="flex">
                <img src={star} alt="star" className="w-4 h-4" />
                <img src={star} alt="star" className="w-4 h-4" />
                <img src={star} alt="star" className="w-4 h-4" />
                <img src={star} alt="star" className="w-4 h-4" />
            </div>
        )
    }
    const testimonials = [
        {
            "name": "Anuj Sengar",
            "text": "S**** transformed our D2C brand with his strategic vision and deep expertise, honed at agencies like Ogilvy and McCann. His use of the 6C model for brand positioning brought clarity to our campaigns and laid the groundwork for long-term growth. S****'s impact on our market presence and messaging has been invaluable.",
            "img": Anuj,
            "rating": starRating4()
        }, {
            "name": "Sonam Dubey",
            "text": "Working with A**** has significantly improved our brand's performance. His expert channel recommendations boosted our ROAS and solved key scaling challenges. His strategic, data-driven approach has optimized our marketing efforts and driven sustainable growth. We highly recommend him for enhancing brand performance.",
            "img": Sonam,
            "rating": starRating5()
        },
        {
            "name": "Randeep Singh",
            "text": "After trying three agencies with no significant gains in revenue or ROAS, V***** turned things around for us. Her strategic approach doubled our revenue to ₹2 crore per month in just six months. We highly recommend her to any brand seeking a performance marketer who delivers real results.",
            "img": Randeep,
            "rating": starRating4half()
        },
        {
            "name": "Sanjana Kushwaha",
            "text": "A*** has been pivotal in boosting our website's performance. Her deep expertise in D2C and marketplace tech UI/UX design transformed our user experience, leading to significant conversion rate improvements. Thanks to her strategic approach to product design and user flow, we've seen a marked increase in user engagement and conversion.",
            "img": Sanjana,
            "rating": starRating4half()
        },
        {
            "name": "Payal Mittal",
            "text": "A**** played a key role in boosting our website's performance and conversion. His D2C UI/UX expertise drove our conversion rate from 0.9% to 1.4%. His recommendations for our product and home pages led to significant business improvements. We highly recommend him for brands seeking to elevate their digital experience and drive growth.",
            "img": Payal,
            "rating": starRating4()
        }, {
            "name": "Kriti Gupta",
            "text": "Our agency's results had sharply declined, affecting revenue and rotation. We engaged P**** for six months, and his ad spend strategy took our revenue from ₹10 lakh to ₹50 lakh per month. His insights and execution were game-changers. We highly recommend him to any brand seeking a performance marketer who delivers tangible results.",
            "img": Kriti,
            "rating": starRating5()
        },
        {
            "name": "Manish Gaur",
            "text": "Working with K*** was crucial for our brand during a peak season. His expert recommendations on channel selection boosted our ROAS and resolved scaling issues. Available 24/7, he knows exactly which channels to use and when to scale. We highly recommend him for brands needing urgent performance enhancement and impactful results.",
            "img": Manish,
            "rating": starRating4()
        },
        {
            "name": "Madhav Singh",
            "text": "A*** transformed our customer journey with expert email and WhatsApp automation for our apparel brand. His strategies streamlined communication, improved visit-to-purchase conversions, and enhanced upselling and cross-selling, resulting in higher engagement and sales. We highly recommend him for brands aiming to optimize customer interactions and drive growth.",
            "img": Madhav,
            "rating": starRating4half()
        },
        {
            "name": "Akanksha Gupta",
            "text": "P*** has been crucial in boosting our revenue by expertly allocating marketing spend to the right categories and top-selling products. His strategic approach maximized our impact and resulted in a significant sales increase. His insights into our product portfolio and opportunity identification made a substantial difference.",
            "img": Akanksha,
            "rating": starRating4half()
        }
    ];

    return (
        <section className='text-center bg-white px-4 md:px-32 pb-10 pt-2 md:pb-16'>

            <div>
                <h1 className='text-2xl text-center md:text-3xl mb-6 md:mb-10'>Testimonials</h1>
            </div>
            <div className='user-select-none'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    loop={true}
                    breakpoints={{
                        540: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        }
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="testimonialSwiper pb-7 select-none"
                >
                    {
                        testimonials && testimonials.map((testimonial, index) =>
                            <SwiperSlide key={index} className='flex flex-col bg-white rounded-xl py-5 px-7 border border-solid 
                             border-[#222222]/10 shadow-[0_7px_14px_#EAEAEA] h-64'>
                                <div className='select-none h-full flex flex-col justify-between'>
                                    <h3 className="text-sm text-left font-sans line-clamp-[9] select-none">{testimonial.text}</h3>
                                    <div className="flex gap-2 items-center">
                                        <div>
                                            <img src={testimonial.img} alt={testimonial.name} className="w-8 h-8 bg-black rounded-full" />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="text-sm">{testimonial.name}</h4>
                                            <span>{testimonial.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>)
                    }

                </Swiper>
            </div>
        </section >
    )
};

export default Testimonials;

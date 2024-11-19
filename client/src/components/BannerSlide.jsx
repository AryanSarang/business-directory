import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = ({ cards }) => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full px-4 md:px-8">
      {/* Left Arrow */}
      <button 
        onClick={scrollLeft} 
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10"
      >
        <FaChevronLeft />
      </button>

      {/* Carousel */}
      <div 
        className="flex space-x-4 overflow-hidden"  
        ref={carouselRef}
      >
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="flex-shrink-0  w-[95%] md:w-[50%] lg:w-[32%] bg-black rounded-lg shadow-md mx-2" 
          >
            <img src={card.img} alt={card.heading} />
            <div className='h-64 text-white my-12 mx-10 flex flex-col content-between'>
              <div className='flex-grow'>
                <h3 className="text-lg font-semibold mb-4">{card.heading}</h3>
                <p className="">{card.content}</p>
              </div>
              <div >
                Read Article
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button 
        onClick={scrollRight} 
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default function() {
  const cardElements = [
    {
      img: "https://images.ctfassets.net/wowgx05xsdrr/4T8dEmpNiOGgHX6qTAfBS6/75c08c84fdb13d444761ad8abcb012aa/ecommerce-analytics-article-thumbnail.jpg?fm=webp&w=1200&q=75",
      heading: "Easier to Implement",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      img: "https://images.ctfassets.net/wowgx05xsdrr/3sGfAsxnsLzars8aljYUST/496e91cb93d2155f29b2dfe2ec64ed91/article-thumbnail-credit-card-computer-business-woman-payment.jpg?fm=webp&w=1200&q=75",
      heading: "Faster Execution",
      content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      img: "https://images.ctfassets.net/wowgx05xsdrr/2ofbj2CBrQj3jW0fmULyvp/3bc0c30f71265e200a927f7dd6264dbd/future-of-ecommerce-thumbnail.jpg?fm=webp&w=1200&q=75",
      heading: "Future Proof",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
    },
    {
      img: "https://images.ctfassets.net/wowgx05xsdrr/6hRJms3nYiDC3Q4YFOchLG/b05f50af51f81a8a2a4bf538b95db936/article-thumbnail-furniture-ecommerce.png?fm=webp&w=1200&q=75",
      heading: "Reliable Results",
      content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum."
    },
  ];

  return <Carousel cards={cardElements} />;
}

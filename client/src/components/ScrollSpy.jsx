import React, { useEffect, useState } from 'react';

const ScrollSpy = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
         
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    
    }
  };
    const sections = [
        { id: 'section1', title: 'Is Affiliate Marketing the same as Performance Marketing?' },
        { id: 'section2', title: 'How Does Performance Marketing Work?' },
        { id: 'section3', title: 'What are the Benefits of Performance Marketing?' },
        { id: 'section4', title: 'How do you Measure Performance Marketing?' },
        { id: 'section5', title: 'What are the Most Common Types of Performance Marketing?' },
        { id: 'section6', title: 'What are some Performance Marketing Tips to be successful?' },
        { id: 'section7', title: 'The End' },
    ];

    
    return <div className="max-w-[1156px] mx-auto my-20">
          <div className="lg:grid grid-cols-12 px-2">
            {/* Left side - Table of Contents */}
            <div className="hidden lg:block col-span-4 pr-10 sticky top-24 self-start">
              <h4 className=" md:text-lg font-semibold mb-5">Table of Contents</h4>
              <div>
                <ol className="text-lg space-y-5">
                  {sections.map((section) => (
                    <li
                      key={section.id}
                      className={`cursor-pointer ${
                        activeSection === section.id ? 'text-blue-400 font-bold underline underline-offset-2' : 'hover:underline underline-offset-2s'
                      }`}
                      onClick={() => handleScroll(section.id)}
                    >
                      {section.title}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="col-span-8 lg:pl-10 tracking-wide mx-3 ">
                <section className= 'scroll-margin mb-10 ' id="section1">
                    <h4 className = "font-bold md:text-4xl mb-5 tracking-wider"> 
                        Is Afflilate Marketing the same as Performance Marketing ?
                    </h4>
                    <p className = 'mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                    <p className ='mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                    <p className ='mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                </section>
                <section className= 'scroll-margin mb-10' id="section2">
                    <h4 className = "font-bold text-4xl mb-5 tracking-wider"> 
                    How Does Performance Marketing Work?
                    </h4>
                    <p className = 'mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                    <p className ='mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                    <p className ='mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                </section>
                <section className= 'scroll-margin mb-10' id="section3">
                    <h4 className = "font-bold text-4xl mb-5 tracking-wider"> 
                        What are the Benefits of Performance Marketing
                    </h4>
                    <p className = 'mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                    <p className ='mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                    <p className ='mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                </section>
                <section className= 'scroll-margin mb-10' id="section4">
                    <h4 className = "font-bold text-4xl mb-5 tracking-wider"> 
                        How Do You Measure Performance Marketing?
                    </h4>
                    <p className = 'mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                    <p className ='mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                    <p className ='mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                </section>
                <section className= 'scroll-margin mb-10' id="section5">
                    <h4 className = "font-bold text-4xl mb-5 tracking-wider"> 
                        How Do You Measure Performance Marketing?
                    </h4>
                    <p className = 'mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                    <p className ='mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                    <p className ='mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                </section>
                <section className= 'scroll-margin mb-10' id="section6">
                    <h4 className = "font-bold text-4xl mb-5 tracking-wider"> 
                        How Do You Measure Performance Marketing?
                    </h4>
                    <p className = 'mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                    <p className ='mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                    <p className ='mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                </section>
                <section className= 'scroll-margin mb-10' id="section7">
                    <h4 className = "font-bold text-4xl mb-5 tracking-wider"> 
                        How Do You Measure Performance Marketing?
                    </h4>
                    <p className = 'mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                    <p className ='mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                    <p className ='mb-4'>
                        Affiliate marketing is a subset of the larger “performance marketing” umbrella, which includes influencer marketing, email marketing, search marketing and any other form of marketing where the marketing partner exchanges sales (or defined performance metrics) for commission payouts.
                    </p>
                </section>
            </div>
        </div>
    </div>
}

export default ScrollSpy;
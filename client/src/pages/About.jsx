import AboutBanner from "../components/About/AboutBanner";
import AboutCard from "../components/About/AboutCard";
import Experts from "../components/About/Experts";
import MapChart from "../components/About/MapChart";
import Numbers from "../components/About/Numbers";

const about = [
    {
        title: "About Us",
        content: "Build a relationship between It services" 
    },
    [
        {
            img: "http://t.commonsupport.xyz/zentec/images/resource/featured-image-4.jpg",
            heading: "Easier to Implement",
            content: "Sed incididunt labore dolore magna sed aliq veniam quis ipsu nostrud exercitation ullamco sed ipsum venum"
        },
        {
            img: "http://t.commonsupport.xyz/zentec/images/resource/featured-image-5.jpg",
            heading: "Easier to Implement",
            content: "Sed incididunt labore dolore magna sed aliq veniam quis ipsu nostrud exercitation ullamco sed ipsum venum"
        },
        {
            img: "http://t.commonsupport.xyz/zentec/images/resource/featured-image-6.jpg",
            heading: "Easier to Implement",
            content: "Sed incididunt labore dolore magna sed aliq veniam quis ipsu nostrud exercitation ullamco sed ipsum venum"
        },
    ],
    [
        {
            heading: "System Integrations Done",
            number: 1763,
            content: "for customers"
        },
        {
            heading: "Powerful Team to Focus",
            number: 1763,
            content: "Expert Members"
        },
        {
            heading: "System Integrations Done",
            number: 1763,
            content: "Fully Launched"
        },
    ],
    [
        {
            img: "http://t.commonsupport.xyz/zentec/images/resource/team-image-2.jpg",
            name: "Amayda Tim",
            post: "Team Leader, IT",
            description: "Veniam quis nostrud exercitaon ullam laboris nis aliquip sed conseqal."

        },
        {
            img: "http://t.commonsupport.xyz/zentec/images/resource/team-image-1.jpg",
            name: "Benjamin Zara",
            post: "Marketing Manager",
            description: "Veniam quis nostrud exercitaon ullam laboris nis aliquip sed conseqal."

        },
        {
            img: "http://t.commonsupport.xyz/zentec/images/resource/team-image-3.jpg",
            name: "Paul Wilsona",
            post: "CEO, IT Expert",
            description: "Veniam quis nostrud exercitaon ullam laboris nis aliquip sed conseqal."

        },
    ]
]

const About = () => {
    return (
        <div className="pt-20">
            <div className='w-full bg-gradient-to-r from-teal-400 to-sky-400'>
                <div className="text-white py-20 md:py-24 lg:py-28 md:pl-32 lg:pl-44 md:text-left text-center">
                    <h2 className="font-bold text-6xl">
                        About Us
                    </h2>
                    <div className="text-xl">
                        Build a relationship between It services
                    </div>
                </div>
            </div>

            <div className="lg:max-w-[1170px] md:max-w-[950px] mb-28 flex flex-col items-center mx-3 mt-10 lg:mx-auto md:mx-3">
                <div className="mb-5 underline underline-offset-2 decoration-pink-700">
                    Zentec - Welcome to It Solutions
                </div>
                <div className="text-3xl font-bold md:text-4xl md:font-bold mb-10 text-center">
                    Your next Preferred IT Partner
                </div>
                <div className="flex flex-wrap justify-center gap-x-2 gap-y-5 lg:gap-y-0 text-slate-700 mb-16">
                    <div className="lg:w-[48%] w-full leading-relaxed">
                        Dolor sit amet, consectetur adipisicing elitm sed don eiusmod tempor sed incididunt ut labore etsu dolore magna aliquatenim minim veniam quis ipsum nostrud exerpsum citation ullamco laboris nisi ut aliquip consequat.
                    </div>
                    <div className="lg:w-[48%] w-full">
                        <ul className="leading-relaxed">
                            <li>
                                We are committed to providing quality IT Services fads;lfjasl;
                            </li>
                            <li>
                                We are committed to providing quality IT Services
                            </li>
                            <li>
                                We are committed to providing quality IT Services
                            </li>
                            <li>
                                We are committed to providing quality IT Services
                            </li>
                            <li>
                                We are committed to providing quality IT Services
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-wrap justify-around gap-y-12 ">
                    {about[1].map((item,i) => {
                        return <AboutCard 
                            key={i}
                            img={item.img}
                            heading={item.heading}
                            content ={item.content}
                        />
                    })}
                </div>
            
            </div>
            <div className="border-t border-slate-400 bg-white">
                <div className="lg:max-w-[1170px] md:mx-auto md:max-w-[950px] mx-3 mt-5">
                    <div className="max-w-[720px] mx-auto">
                        <div className=" text-center my-10 underline underline-offset-2 decoration-pink-700">
                            Zentec - Welcome to It Solutions
                        </div>
                        <div className="font-bold text-4xl text-center">
                            Trusted By 5M ZenTec IT Customers Around The World
                        </div>
                    </div>
                    <MapChart/>
                </div>
            </div>
            <div className="bg-red-500">
                <AboutBanner/>
            </div>
            <div className="bg-white">

            <div className="block md:flex flex-wrap lg:max-w-[1170px] md:max-w-[950px] mx-auto">
                    {about[2].map((item, i) =>(
                        <div key={i}
                        className={`flex-1  md:max-w-[33%] ${i != about[2].length-1 ? "border-r border-slate-500" : ""}`}>
                            <Numbers
                                heading={item.heading}
                                number={item.number}
                                content={item.content}
                                />
                        
                        </div>  
                    )
                )}
            </div>
            </div>
            <div>
                <Experts props={about[3]} />
            </div>
        </div>
    )
};

export default About;




{/* <main className="py-16 md:p-32 px-4">
            <div className='md:flex'>
                <div>
                    <h1 className="text-5xl md:text-7xl bannerHeading ">
                        Start growing
                    </h1>
                    <h1 className="text-5xl md:text-7xl gilroy-extraBold bannerHeading">
                        your business <br /> today
                    </h1>
                    <h3 className="text-xl md:text-2xl mt-10 md:mt-5">
                        Get consultant from industry leading professionals
                        <br />
                        Make an impact in your domain
                    </h3>
                </div>
                <div className="w-full md:w-5/12 mt-10 md:mt-3 md:ms-auto ">
                    <img src={aboutBanner} alt='about banner' className=' w-full' />
                </div>
            </div>

            <div>

            </div>
        </main> */}
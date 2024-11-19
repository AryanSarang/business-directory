import ScrollSpy from "../components/ScrollSpy" ;
import BannerSlide from '../components/BannerSlide';

const Performance = () => {
    return <div className="bg-white pt-0 md:py-20 ">
        <div className="lg:w-[1156px] my-20 lg:mx-auto md:mx-6 mx-3">
            <div className="mx-auto w-[80%] text-center font-semibold text-xl md:font-bold md:text-4xl mb-6 leading-tight">
                A Beginner’s Guide to Performance Marketing: Everything You Need to Know
            </div>
            <div className="">
                <img src="https://images.ctfassets.net/wowgx05xsdrr/4k5VQ0tOlrXMDDacXNFQYe/4ab3879f040e7c7578dd7e806d0b5a50/article-header-performance-marketing-socials-generic.jpg?fm=webp&w=3840&q=75" alt="image" />
            </div>
        </div>
        <div className="bg-black text-white text-center py-12 px-2">
            <div className="font-semibold text-lg md:text-2xl tracking-wider mb-4">
                Increase Your Ecommerce Sales from $1 million to $100 Million
            </div>
            <div className="cursor-pointer hover:text-cyan-300">
                FIND OUT HOW
            </div>
        </div>
        <div className= "my-6">
            <ScrollSpy/>
        </div>
        <div className="lg:w-[1156px] lg:mx-auto">
            <BannerSlide/>
        </div>
    </div> 
}
export default Performance;
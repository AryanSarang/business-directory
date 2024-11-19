export default function({img, heading, content}){
    return <div className="bg-white w-full md:max-w-[48%] lg:w-[33%] relative group cursor-pointer ">
        <div>
            <img src={img} alt="" className="w-full"/>
        </div>
        <div className="pt-12 pb-14 px-5 flex flex-col items-center">
            <h4 className="font-semibold text-xl pb-3 tracking-wide">
                {heading}
            </h4>
            <div className="text-center">
                {content}
            </div>
        </div>
        <div className="w-full absolute -bottom-7 flex justify-center">
            <span className="flex items-center justify-center right-6 w-12 h-12 leading-normal bg-sky-400 text-white rounded-full cursor-pointer transition-all duration-300 ease-in-out group-hover:bg-pink-400">
                go
            </span>
        </div>
    </div>
}
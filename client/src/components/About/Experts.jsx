export default function({props}){
    return <div className="lg:max-w-[1170px] md:max-w-[950px] mx-auto pt-6 md:py-28 md:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
            <div className="text-center md:text-left">    
                <div className="mb-2 text-purple-700 leading-loose font-medium underline underline-offset-2 decoration-pink-600 ">
                    Ambitious & Dedicated Team
                </div>
                <div className="text-4xl mb-6">
                    ZenTech IT Experts
                </div>
                <div className="text-slate-600">
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit amet velit sed quia non numquam eius modi tempora incidunt labore dolore magna aliqua enim minim veniam, quis nostrud exercitation ullamco.
                </div>
            </div>
            {props.map((item, i ) => (
                <div
                    key={i}
                    className="mx-3 my-2 min-h-[450px] md:ml-16 md:min-h-[210px] bg-white relative">
                    <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:-left-16 md:top-4 pt-12 md:pt-0 md:pl-4">
                        <img src={item.img} alt="" className=" w-72 min-w-72 md:min-w-[200px] md:w-[200px] md:h-[180px]"/>
                    </div>
                    <div className="flex flex-col justify-end h-full pb-6  md:block w-full md-w-auto pt-48  md:py-11 md:pl-44 md:pr-8 text-center md:text-left">
                        <div className="font-semibold text-xl tracking-wider mb-2">
                            {item.name}
                        </div>
                        <div className="text-pink-400 mb-6">
                            {item.post}
                        </div>
                        <div>
                            {item.description}
                        </div>
                    </div>
                
            </div>
            ))}
        </div>
    </div>
}
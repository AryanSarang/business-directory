import CardConversion from "./CardConversion";

const Conversions = () => {
    return (
        <div className="text-center my-20">
            <h1 className="text-3xl  md:text-6xl mb-10 md:mb-20">Possibilities made <b className="gilroy-bold ">reality</b></h1>
            <div className="flex mx-4 md:mx-0 flex-col gap-4 md:gap-7 text-center">
                <div className="flex flex-wrap md:flex-nowrap gap-3  md:gap-5 text-center items-center justify-center">

                    <CardConversion width="w-4/12" src="https://topmate.io/_next/image?url=%2Fimages%2Fhomepage%2Fservice-desktop-1.svg&w=256&q=75" />
                    <CardConversion width="w-7/12" src="https://topmate.io/_next/image?url=%2Fimages%2Fhomepage%2Fservice-desktop-2.svg&w=256&q=75" />
                    <CardConversion width="w-full" src="https://topmate.io/_next/image?url=%2Fimages%2Fhomepage%2Fservice-desktop-3.svg&w=256&q=75" />
                </div>
                <div className=" flex flex-wrap md:flex-nowrap gap-3 md:gap-5 text-center items-center justify-center">
                    <CardConversion width="w-7/12" src="https://topmate.io/_next/image?url=%2Fimages%2Fhomepage%2Fservice-desktop-4.svg&w=256&q=75" />
                    <CardConversion width="w-4/12" src="https://topmate.io/_next/image?url=%2Fimages%2Fhomepage%2Fservice-desktop-5.svg&w=256&q=75" />
                    <CardConversion width="w-full" src="https://topmate.io/_next/image?url=%2Fimages%2Fhomepage%2Fservice-desktop-6.svg&w=256&q=75" />
                </div>
            </div>
        </div>
    )
};

export default Conversions;

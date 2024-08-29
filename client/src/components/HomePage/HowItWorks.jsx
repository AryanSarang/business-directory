
import ProcessImage from '../../assets/process.png';
import Accordion2 from "./Accordion2";

const HowItWorks = () => {
    return (
        <section className="bg-white px-4 md:px-32 py-10 md:py-0" >
            <h1 className="text-2xl text-center md:text-4xl mb-7 md:mb-6">Consultion <b className="gilroy-extraBold">process</b></h1>
            <div className="flex flex-col justify-between md:flex-row">
                <div className="md:w-1/2 p-10 pt-0">
                    <img src={ProcessImage} alt="consulting process" className="rounded-lg md:w-3/4 md:ms-auto" />
                </div>
                <Accordion2 />
            </div>
        </section>
    )
};

export default HowItWorks;

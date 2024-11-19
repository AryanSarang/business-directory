import Detail from '../components/Contact/Detail';
import Form from '../components/Contact/Form';

const Contact = () => {
    return (
        <div className="pt-20">
            <div className=' lg:flex justify-center mx-4 md:mx-16 lg:mx-20 py-0 md:py-16 h-full '>
                <div className='flex-1 lg:min-h-[842px]'>
                    <Detail/>
                </div>
                <div className='flex-1 lg:min-h-[842px]'>
                    <Form/>
                </div>
            </div>
        </div>
    )
};

export default Contact;

import { useState } from "react";
import { useSelector } from 'react-redux';
const Form = () => {

    const { currentUser } = useSelector((state) => state.user);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState(null)
    const [message, setMessage] = useState('')
    
    const formData = {
        name,
        email,
        phone,
        message,
    };

    // If currentUser exists, add its data to the form data
    if (currentUser) {
        formData.user = currentUser._id;
    }

    console.log(currentUser)
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/user/contactus', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(data.success ){
                alert(data.message)
            }
            else{
                alert("nooooooo")
            }
        } catch (error) {
            
        }
    }

    return <div className="bg-white px-5 py-6 md:p-12 min-[842px] h-full">
        <div>
            <h2 className="font-semibold md:font-bold text-2xl md:text-4xl">
                Level up your brand
            </h2>
            <p className="mt-6 text-xl">
                You can reach us anytime via  
                <a href="#" className=" pl-2 text-[#54359d] underline underline-offset-4 hover:text-[#f1c50e] ">
                    hi@ourcompany.com
                </a>
            </p>
            <div className="mt-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-7">
                        <label htmlFor="">
                            Name
                        </label>
                        <input type="text" placeholder="Enter your Name" required
                            className="w-full px-2 py-2 bg-[#f2f2f2] rounded-md border border-[#e5e5e5] outline-none"
                            onChange={(e) => {
                                setName(e.target.value)
                            }}    
                            />
                    </div>
                    <div className="mb-7">
                        <label htmlFor="">
                            Email
                        </label>
                        <input type="email" placeholder="Enter a valid email address" required
                            className="w-full px-2 py-2 bg-[#f2f2f2] rounded-md border border-[#e5e5e5] outline-none"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            />
                    </div>
                    <div className="mb-7">
                        <label htmlFor="">
                            Phone
                        </label>
                        <input type="text" placeholder="Enter your phone" required
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10-digit phone number"
                            className="w-full px-2 py-2 bg-[#f2f2f2] rounded-md border border-[#e5e5e5] outline-none"
                            onChange={(e) => {
                                setPhone(e.target.value)
                            }}
                            />
                    </div>
                    <div className="mb-7">
                        <label htmlFor="">
                            How can we help?
                        </label>
                        <textarea type="text" placeholder="Enter a valid email address" rows={5} required
                            className="w-full px-2 py-2 bg-[#f2f2f2] rounded-md border border-[#e5e5e5] outline-none resize-none"
                            onChange={(e) => {
                                setMessage(e.target.value)
                            }}
                            />
                    </div>
                    <div>
                        <button className="w-full px-auto py-4 rounded-lg font-semibold tracking-widest bg-[#f1c50e] text-[#54359d] hover:bg-[#54359d] hover:text-white"
                        >
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}

export default Form;
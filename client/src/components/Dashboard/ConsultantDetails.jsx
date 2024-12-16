import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chips } from "primereact/chips";
import { constultantUpdateStart, consultantUpdateFailure, consultantUpdateSuccess } from "../../redux/user/userSlice";


const ConsultantDetails = () => {

    const dispatch = useDispatch();
    const { currentUser, loading } = useSelector(state => state.user);
    const [consultantData, setConsultantData] = useState({})
    const [updatedConsultantData, setUpdatedConsultantData] = useState({})
    const [value, setValue] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false)



    function handleChange(e) {

        setUpdatedConsultantData({
            ...updatedConsultantData,
            [e.target.id]: e.target.value,

        })
    }

    useEffect(() => {
        if (consultantData) {
            setValue(consultantData.companies);
            setUpdatedConsultantData(consultantData);
        }
    }, [consultantData]);


    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch('api/user/fetchconsultant', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: currentUser._id }),
                })
                const data = await res.json();
                if (data.success) {
                    setConsultantData(data.data);

                }


            } catch (error) {
                console.log(error)
            }
        }
        getData()


    }, [])





    async function handleSubmit(e) {
        e.preventDefault();
        dispatch(constultantUpdateStart());

        setUpdatedConsultantData(async prevData => {
            const updatedData = {
                ...prevData,
                companies: value
            };

            // Perform the API call here with the updated data
            const res = await fetch('api/user/updateconsultant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData)
            })
            const data = await res.json();
            if (data.success) {
                setSuccessMessage(true)
                setConsultantData(updatedData);
                dispatch(consultantUpdateSuccess())
            }
            else {
                dispatch(consultantUpdateFailure())
            }


        });

    }

    function handleDiscard(e) {
        e.preventDefault();
        setUpdatedConsultantData(consultantData); // Reset to original data
        setValue(consultantData.companies); // Reset companies data
    }



    return <div className=" p-5 md:px-12 py-4 bg-custom-white rounded-lg shadow-lg">
        <div className="mb-5 flex justify-center font-bold text-lg">
            Consultant details
        </div>
        <form >

            <div className="md:flex justify-center gap-x-12 ">
                <div className="flex flex-col gap-y-5 mb-5">
                <div>
                    <span className=" text-sm tracking-wide">
                        Name:
                    </span>
                    <div className="mt-2">
                        <input type="text" id="name" onChange={handleChange} value={updatedConsultantData.name || ""}
                            className="w-full min-w-56 px-2 py-1 rounded-lg border border-slate-300"
                        />
                    </div>
                </div>
                <div>
                    <span className="text-sm tracking-wide">
                        Phone
                    </span>
                    <div className="mt-2">
                        <input type="text" id="phone1" disabled value={updatedConsultantData.phone || ""}
                            className="w-full min-w-56  px-2 py-1 rounded-lg border border-slate-300"
                        />
                    </div>
                </div>
                <div>
                    <span className="text-sm tracking-wide">
                        Specilization:
                    </span>
                    <div className="mt-2">
                        <input type="text" disabled value={updatedConsultantData.specialization || ""}
                            className="w-full min-w-56 px-2 py-1 rounded-lg border border-slate-300"
                        />
                    </div>
                </div>
                </div>
                <div className="flex flex-col gap-y-5 mb-5">
                <div>
                    <span className=" text-sm tracking-wide">
                        Fess per Consultation:
                    </span>
                    <div className="mt-2">
                        <input type="text" id="feesPerConsultation" onChange={handleChange} value={updatedConsultantData.feesPerConsultation || ""}
                            className="w-full min-w-56 px-2 py-1 rounded-lg border border-slate-300"
                        />
                    </div>
                </div>
                <div>
                    <span className="text-sm tracking-wide">
                        LinkedIn:
                    </span>
                    <div className="mt-2">
                        <input type="text" id="linkedinUrl" onChange={handleChange} value={updatedConsultantData.linkedinUrl || ""}
                            className="w-full min-w-56 px-2 py-1 rounded-lg border border-slate-300"
                        />
                    </div>
                </div>

                <div>
                    <span className=" text-sm tracking-wide">
                        Min hour:
                    </span>
                    <div className="mt-2">
                        <input type="text" id="minHour" onChange={handleChange} value={updatedConsultantData.minHour || ""}
                            className="w-full min-w-56 px-2 py-1 rounded-lg border border-slate-300"
                        />
                    </div>
                </div>
                
                <div>
                    <span className=" text-sm tracking-wide">
                        Order:
                    </span>
                    <div className="mt-2">
                        <input type="text" disabled value={updatedConsultantData.ordersNumber || ""}
                            className="w-full min-w-56 px-2 py-1 rounded-lg border border-slate-300"
                        />
                    </div>
                </div>
                </div>
                <div className="flex flex-col gap-y-5 mb-5">
                <div>
                    <span className="text-sm tracking-wide">
                        Experience Year:
                    </span>
                    <div className="mt-2">
                        <input type="text" id="experienceYear"
                            onChange={handleChange} value={updatedConsultantData.experienceYear || ""}
                            className="w-full min-w-56 px-2 py-1 rounded-lg border border-slate-300"
                        />
                    </div>
                </div>
                <div>
                    <span className=" text-sm tracking-wide">
                        Experience:
                    </span>
                    <div className="mt-2">
                        <textarea type="text" id="experience" onChange={handleChange} value={updatedConsultantData.experience || ""}
                            className="w-full min-w-56 px-2 py-1 rounded-lg border border-slate-300 h-24 resize-none"
                        />
                    </div>
                </div>
                <div>
                    <span className=" text-sm tracking-wide">
                        Companies:
                    </span>

                    <div className="consultantCompanies mt-2">
                        <Chips value={value} separator=","
                            itemTemplate={(chip) => (
                                <div className=" text-gray-800 rounded-lg px-2">
                                    {chip}
                                </div>
                            )}
                            onChange={(e) => setValue(e.value)}
                            className="w-full min-w-56 px-2 py-1 rounded-lg border border-slate-300"
                        />
                    </div>
                </div>
                
                {successMessage &&
                    <div className="border rounded-lg text-green-400 text-center py-2 ">
                        Details updated Sucessfully
                    </div>
                }
                <div className="flex justify-between gap-x-5 col-span-2 mt-6">
                    <button className="w-full py-2 px-3 text-slate-700 border border-slate-700 rounded-lg "
                        onClick={handleDiscard}
                    >
                        Discard
                    </button>
                    <button disabled={loading} className="w-full py-2 px-3 bg-slate-700 text-white rounded-lg hover:opacity-90"
                        onClick={handleSubmit}
                    >
                        {loading ? "Submitting" : "Submit"}
                    </button>
                </div>
                </div>
            </div>
        </form>
    </div>
}
export default ConsultantDetails;
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CardAllConsultant from "../components/CardAllConsultant";
import { clearError } from "../redux/user/userSlice";
import { useParams } from 'react-router-dom'

const AllConsultants = () => {
    const { id } = useParams();
    const [consultants, setConsultants] = useState([]);
    const dispatch = useDispatch();
    const [selectedSpecialization, setSelectedSpecialization] = useState(id);

    const specializations = ['All', ...new Set(consultants.map(c => c.specialization))];

    const handleFilterChange = (event) => {
        setSelectedSpecialization(event.target.value);
    };

    const filteredConsultants = selectedSpecialization === 'All'
        ? consultants
        : consultants.filter(consultant => consultant.specialization === selectedSpecialization);

    useEffect(() => {
        setSelectedSpecialization(id);
    }, [id])

    useEffect(() => {
        dispatch(clearError());
        const getConsultants = async () => {
            try {
                const res = await fetch("/api/auth/allconsultants", {
                    method: "GET",
                });
                const data = await res.json();

                if (data.success) {
                    const approvedConsultants = data.data.filter(consultant => consultant.approved === "approved");
                    setConsultants(approvedConsultants);
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getConsultants();
    }, []);
    return (
        <main className="pb-14 md:py-40 px-4 md:px-32 ">
            <h1 className="text-3xl md:text-5xl text-center  my-7 md:mb-24">Find a mentor, you <b className="gilroy-extraBold">admire</b></h1>
            <div id="filter" className="mb-8 flex justify-center md:justify-start mx-3">
                <select
                    className="p-2 px-4 border-gray-300 rounded font-semibold focus:ring-slate-400 border-0 shadow-sm"
                    value={selectedSpecialization}
                    onChange={handleFilterChange}
                >
                    {specializations.map((specialization, index) => (
                        <option className="py-5 font-semibold" key={index} value={specialization}>
                            {specialization}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center mx-4 gap-5 flex-wrap">
                {filteredConsultants.map((consultant, index) => (
                    <CardAllConsultant key={index} consultant={consultant} />
                ))}
            </div>
        </main>
    )
};

export default AllConsultants;

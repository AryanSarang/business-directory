import { Link } from "react-router-dom";

const AdminControls = () => {
    return (
        <div className="shadow-md text-center bg-custom-white md:px-60 md:py-11 p-5 rounded-lg">
            <h2 className=" gap-1 items-center text-center mx-auto text-2xl mb-9 font-medium text-gray-900 gilroy-bold tracking-wider">Admin only controls</h2>
            <div className="w-full flex flex-col  md:flex-row justify-between md:gap-0 gap-10 ">
                <Link to="/admin/users" className="text-white tracking-wider gilroy-Bold hover:bg-white
             hover:text-slate-700 bg-slate-500 border-2 rounded-md border-slate-500 p-2 text-center">Users list</Link>
                <Link to="/admin/consultants" className="text-white tracking-wider gilroy-Bold hover:bg-white
             hover:text-slate-700 bg-slate-500 border-2 rounded-md border-slate-500  p-2 text-center">Consultants list</Link>
                <Link to="/admin/consultations" className="text-white tracking-wider gilroy-Bold hover:bg-white
             hover:text-slate-700 bg-slate-500 border-2 rounded-md border-slate-500  p-2 text-center">All Consultations</Link>
                <Link to="/admin/blogs" className="text-white tracking-wider gilroy-Bold hover:bg-white
             hover:text-slate-700 bg-slate-500 border-2 rounded-md border-slate-500  p-2 text-center">All Blogs</Link>
            </div>

        </div>
    )
};

export default AdminControls;

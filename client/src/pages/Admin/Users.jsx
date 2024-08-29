import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearError } from "../../redux/user/userSlice";
import UserTable from "./UserTable";

const Users = () => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearError());
        const getUsers = async () => {
            try {
                const token = localStorage.getItem("access_token");

                const res = await fetch("/api/admin/getAllUsers", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await res.json();
                console.log(data);
                if (data.success) {
                    setUsers(data.data);
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }

        }

        getUsers();
    }, []);
    return (
        <div className="py-2 px-2 md:py-52 md:px-20">


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Admin
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Consultant
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Account created
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.slice().reverse().map((user, index) => (
                            <UserTable key={index} user={user} />
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
};

export default Users;

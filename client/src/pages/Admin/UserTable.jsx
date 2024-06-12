import moment from 'moment';

const UserTable = ({ user }) => {
    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-6 flex gap-5  items-center py-4 font-medium text-gray-900 whitespace-nowrap ">
                <img className="w-10 h-10 rounded-full" src={user.avatar} alt={user.username} />{user.username}
            </th>
            <td className="px-6 py-4">
                {user.email}
            </td>
            <td className="px-6 py-4">
                {user.isAdmin && "true"}
            </td>
            <td className="px-6 py-4">
                {user.isConsultant && "true"}
            </td>
            <td className="px-6 py-4">
                {moment(user.createdAt).fromNow()}
            </td>
        </tr>
    )
};

export default UserTable;

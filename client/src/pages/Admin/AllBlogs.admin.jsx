import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearError } from "../../redux/user/userSlice";
import ConsultationCard from "./ConsultaionCard";
import BlogCard from "../../components/Admin/BlogCard.admin";

const AdminAllBlogs = () => {
    const [Blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const blogsPerPage = 10;
    const [totalPages, setTotalPages] = useState(0);
    const dispatch = useDispatch();
    const [selectedTag, setSelectedTag] = useState('All');

    const tags = ['All', 'UI & UX', 'Software', 'SEO', 'Performance Marketing', 'CRM'];

    const handleFilterChange = (event) => {
        setSelectedTag(event.target.value);
        setCurrentPage(1);
    };

    useEffect(() => {
        dispatch(clearError());
        const getBlogs = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const encodedTag = encodeURIComponent(selectedTag);

                const res = await fetch(`/api/admin/getallblogs?page=${currentPage}&limit=${blogsPerPage}&tag=${encodedTag}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (data.success) {
                    setBlogs(data.data);
                    setTotalBlogs(data.totalBlogs);
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }

        }
        getBlogs();
    }, []);
    useEffect(() => {
        setTotalPages(Math.ceil(totalBlogs / blogsPerPage));

    }, [totalBlogs]);


    const pathStyle = {
        display: 'inline',
        fill: 'none',
        stroke: '#111',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: '10'
    };
    return (
        <main className="py-16 md:p-32">
            <h1 className="text-3xl md:text-5xl text-center mb-16 font-semibold tracking-wide">Blogs</h1>
            <div id="filter" className="mb-8 flex justify-center md:justify-start mx-3">
                <select
                    className="p-2 px-4 border-gray-300 rounded font-semibold focus:ring-slate-400 border-0 shadow-sm"
                    value={selectedTag}
                    onChange={handleFilterChange}
                >
                    {tags.map((tag, index) => (
                        <option className="py-5 font-semibold" key={index} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>
            <div className="items-top px-4 flex flex-col md:flex-row md:flex-wrap w-full">
                {Blogs.map((blog, index) => (
                    <div
                        key={index}
                        className={`py-3 w-full ${index % 3 === 0 ? 'basis-full' : 'md:basis-1/2'} ${(index + 2) % 3 === 0 ? 'md:pe-5' : ''}`}
                    >
                        <BlogCard blog={blog} index={index % 3} />
                    </div>
                ))}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <button
                        className="px-4 py-1 mx-2 text-white shadow-md border inline-flex items-center border-slate-500 bg-slate-500 rounded-md disabled:opacity-50 group hover:text-slate-500 hover:bg-white"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <svg enableBackground="new 0 0 32 32" height="14" viewBox="0 0 32 32" width="14" xmlns="http://www.w3.org/2000/svg" id="fi_9144318"><g id="Guide" style={{ display: "none" }}>
                            <path d="m-94-10h346v220h-346z" fill="transparent"></path></g><g id="Line" display="none"><path d="m23.5 31-15-15 15-15"
                                style={pathStyle}></path></g><g id="Line_Expand"><path d="m23.5 32c-.26 0-.51-.1-.71-.29l-15-15c-.39-.39-.39-1.02 0-1.41l15-15c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41l-14.29 14.29 14.29 14.29c.39.39.39 1.02 0 1.41-.19.2-.44.3-.7.3z" className="fill-white group-hover:fill-slate-500"></path></g></svg>
                        Previous
                    </button>
                    <button
                        className="px-4 py-1 mx-2 text-white shadow-md border inline-flex items-center border-slate-500 bg-slate-500 rounded-md disabled:opacity-50 group hover:text-slate-500 hover:bg-white"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <svg id="fi_2985179" className="fill-white group-hover:fill-slate-500" enableBackground="new 0 0 128 128" height="20" viewBox="0 0 128 128" width="20" xmlns="http://www.w3.org/2000/svg"><path id="Right_Arrow_4_" d="m44 108c-1.023 0-2.047-.391-2.828-1.172-1.563-1.563-1.563-4.094 0-5.656l37.172-37.172-37.172-37.172c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l40 40c1.563 1.563 1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z"></path></svg>
                    </button>
                </div>
            )}
        </main>
    )
};

export default AdminAllBlogs;

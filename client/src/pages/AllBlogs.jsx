import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BlogCard from "../components/BlogCard";
import { clearError } from "../redux/user/userSlice";

const AllBlogs = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const blogsPerPage = 10;
    const dispatch = useDispatch();
    const [selectedTag, setSelectedTag] = useState('All');

    const tags = ['All', 'UI & UX', 'Software', 'SEO', 'Performance Marketing', 'CRM'];

    const handleFilterChange = (event) => {
        setSelectedTag(event.target.value);
        setCurrentPage(1);
    };

    useEffect(() => {
        dispatch(clearError());

        const getAllBlogs = async () => {
            try {
                const encodedTag = encodeURIComponent(selectedTag);
                const res = await fetch(`/api/auth/allblogs?page=${currentPage}&limit=${blogsPerPage}&tag=${encodedTag}`, {
                    method: "GET",
                });
                const data = await res.json();

                if (data.success) {
                    setAllBlogs(data.data);
                    setTotalBlogs(data.totalBlogs);
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getAllBlogs();
    }, [currentPage, selectedTag, dispatch]);

    const totalPages = Math.ceil(totalBlogs / blogsPerPage);

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
            <div className="items-center px-4 flex flex-col md:flex-row md:flex-wrap w-full">
                {allBlogs.map((blog, index) => (
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
                        className="px-4 py-1 mx-2 text-white bg-slate-500 rounded-md disabled:opacity-50"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        className="px-4 py-1 mx-2 text-white bg-slate-500 rounded-md disabled:opacity-50"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </main>
    )
};

export default AllBlogs;

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BlogCard from "../components/BlogCard";
import { clearError } from "../redux/user/userSlice";

const AllBlogs = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const dispatch = useDispatch();
    const [selectedTag, setSelectedTag] = useState('All');

    const tags = ['All', 'UI & UX', 'Software', 'SEO', 'Performance Marketing', 'CRM'];

    const handleFilterChange = (event) => {
        setSelectedTag(event.target.value);
    };

    const filteredBlogs = selectedTag === 'All'
        ? allBlogs
        : allBlogs.filter(blog => blog.tags.includes(selectedTag));



    useEffect(() => {
        dispatch(clearError());
        const getAllBlogs = async () => {
            try {
                const res = await fetch("/api/auth/allblogs", {
                    method: "GET",
                });
                const data = await res.json();

                if (data.success) {
                    const approvedBlogs = data.data.filter(blog => blog.approved === "approved");
                    const sortedBlogs = approvedBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                    setAllBlogs(sortedBlogs);
                    console.log(data);
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getAllBlogs();
    }, []);
    return (
        <main className="w-11/12 py-20 md:py-40 mx-auto">
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
            <div className="items-center mx-4 flex flex-col md:flex-row md:flex-wrap w-full">
                {filteredBlogs.map((blog, index) => (
                    <div
                        key={index}
                        className={`py-3 ${index % 3 === 0 ? 'basis-full' : 'md:basis-1/2'} ${(index + 2) % 3 === 0 ? 'md:pe-5' : ''}`}
                    >
                        <BlogCard blog={blog} index={index % 3} />
                    </div>
                ))}
            </div>
        </main>
    )
};

export default AllBlogs;

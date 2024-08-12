import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import moment from 'moment';

const Blog = () => {

    const { blogUrl } = useParams();
    const [blog, setBlog] = useState("");
    const sanitizedContent = DOMPurify.sanitize(blog.content);
    useEffect(() => {
        const getBlog = async () => {
            try {
                const res = await fetch("/api/auth/getBlogById", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ blogUrl }),
                });
                const data = await res.json();
                if (data.success) {
                    setBlog(data.data);
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getBlog();
    }, [])
    return (
        <main className="py-10 md:p-32 md:pt-20">
            <div className="relative w-full">
                <img src={blog.featuredImage} className="w-full h-full object-cover" />
            </div>
            <div className="px-52 py-5">
                <div className={`mb-4`}>
                    <h4 className='text-4xl font-semibold tracking-wider line-clamp-2'>{blog.title}</h4>
                    <h6 className="text-gray-500 select-none text-xs mt-4">
                        {moment(blog.updatedAt).format('D MMM, YYYY')}
                    </h6>
                </div>
                <div className={`blog-content`}
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                />
            </div>
            <div className="text-center">
                <a href="/allblogs"><button className="px-4 py-1 mx-2 text-white bg-slate-500 rounded-md">Back to blogs</button></a>
                <div>
                    <h3 className="text-3xl ">Related Blogs</h3>
                </div>
            </div>
        </main>
    )
};

export default Blog;

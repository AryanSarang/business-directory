import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Blog = () => {

    const { blogId } = useParams();
    const [blog, setBlog] = useState("");
    useEffect(() => {
        const getBlog = async () => {
            try {
                const res = await fetch("/api/auth/getBlogById", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ blogId }),
                });
                const data = await res.json();
                if (data.success) {
                    setBlog(data.data);
                    console.log(data);
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
        <div>
            {blog.content}
        </div>
    )
};

export default Blog;

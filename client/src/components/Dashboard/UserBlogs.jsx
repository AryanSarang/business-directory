import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserBlog = () => {
    const [blogs, setBlogs]  = useState([]);
    useEffect(() => {
        async function getBlog(){
            const token = localStorage.getItem("access_token");
            const res = await fetch("/api/user/getUserBlog", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            if(data.success){
                setBlogs(data.data)
                
            }
            
            
        } 
        getBlog()
    },[])

   
    return <div className=" px-3 md:px-12 ">
        <div className="flex justify-center font-bold text-lg">
            Blogs
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
            {blogs.map((blog) => {
                return <EditBlog 
                key= {blog._id}
                blog={blog}
                />
            })}
        </div>
    </div>
}

export default UserBlog;


function EditBlog({blog}){

    const [deleteMessage, setDeleteMessage] = useState(false)

    async function handleDelete(){
        const token = localStorage.getItem("access_token");
        const res = await fetch(`/api/user/deleteblog/${blog._id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        
        })
        const data = await res.json();
        if(data.success){
            setDeleteMessage(true)
        }
    }

    return <div>
        <div className="h-full cursor-pointer border border-slate-200 rounded-lg px-3 py-2">
            {!deleteMessage &&
                <Link to={!deleteMessage && `/blog/${blog.url}`}>
                <div className="mb-5">
                    <img src={blog.featuredImage} alt="blog image"/>
                    <div 
                        className="overflow-hidden text-ellipsis font-semibold"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {blog.title}
                    </div>
                    <div className="mt-3 flex justify-center">
                        {blog.approved == "pending"? (
                            <div className="text-gray-400">
                                {blog.approved[0].toUpperCase()+ blog.approved.slice(1)}
                            </div>
                        ):blog.approved == "approved"?(
                            <div className="text-green-400">
                                {blog.approved[0].toUpperCase()+ blog.approved.slice(1)}
                            </div>
                        ):(
                            <div className="text-red-500">
                                {blog.approved[0].toUpperCase()+ blog.approved.slice(1)}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
            }
            {deleteMessage?
                (<div className="h-full flex justify-center items-center text-red-600 mt-2">
                    Deleted successfully
                </div>)
                :
            <div className="flex justify-center gap-x-3 mt-2">
                
                <Link to={`/updateablog/${blog.url}`}>
                    <button className="flex items-center gap-1 border px-2 py-1 rounded-lg font-semibold"> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" fontSize="12px" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg> 
                        Edit
                    </button>
                </Link>

                <button  className="flex items-center gap-1 bg-red-600 rounded-lg text-white px-2 py-1"
                    onClick={handleDelete}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" id="fi_3405244" data-name="Layer 2" width="1em" height="1em" viewBox="0 0 24 24"><path d="M19,7a1,1,0,0,0-1,1V19.191A1.92,1.92,0,0,1,15.99,21H8.01A1.92,1.92,0,0,1,6,19.191V8A1,1,0,0,0,4,8V19.191A3.918,3.918,0,0,0,8.01,23h7.98A3.918,3.918,0,0,0,20,19.191V8A1,1,0,0,0,19,7Z"></path><path d="M20,4H16V2a1,1,0,0,0-1-1H9A1,1,0,0,0,8,2V4H4A1,1,0,0,0,4,6H20a1,1,0,0,0,0-2ZM10,4V3h4V4Z"></path><path d="M11,17V10a1,1,0,0,0-2,0v7a1,1,0,0,0,2,0Z"></path><path d="M15,17V10a1,1,0,0,0-2,0v7a1,1,0,0,0,2,0Z"></path></svg>
                    Delete
                </button>
                
            </div>}
        </div>
    </div>
}
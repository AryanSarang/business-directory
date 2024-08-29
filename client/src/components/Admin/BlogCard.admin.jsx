import DOMPurify from 'dompurify';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { blogApprovalFailure, blogApprovalStart, blogApprovalSuccess } from '../../redux/user/userSlice';

const BlogCard = ({ blog, index, recommended }) => {
    const navigate = useNavigate();
    const sanitizedContent = DOMPurify.sanitize(blog.content);
    const [btnVisible, setBtnVisible] = useState(true);
    const [approvalStatus, setApprovalStatus] = useState(blog.approved);
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);

    const handleApproval = async (approval) => {
        try {
            dispatch(blogApprovalStart());
            const token = localStorage.getItem("access_token");

            const res = await fetch("/api/admin/blogapprove", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    blogId: blog._id,
                    approved: approval
                }),
            });

            const data = await res.json();

            if (data.success) {
                setApprovalStatus(approval);
                dispatch(blogApprovalSuccess());
            }
        } catch (error) {
            dispatch(blogApprovalFailure(data));
            console.log(error);
        }
    }
    return (
        <div className="border bg-white shadow-md rounded-lg group">
            <Link to={`/blog/${blog.url}`}>
                <div className="relative w-full pb-[38%] overflow-hidden">
                    <img src={blog.featuredImage} className="absolute top-0 left-0 w-full h-full object-cover
                     transition-transform duration-1000 group-hover:scale-110 group-hover:shadow-lg" />
                </div>
                <div className="px-5 py-5">
                    <div className={`mb-4 ${typeof index !== "undefined" && index === 0 && index == 0 ? "md:text-center" : "text-left"}`}>
                        <h4 className={`${recommended ? "text-lg" : "text-2xl"} font-semibold tracking-wide line-clamp-2 group-hover:underline underline-offset-4`}>{blog.title}</h4>
                        <h6 className="text-gray-500 select-none text-xs top-1 right-1 mt-1 mr-1">
                            <b> {blog.author}</b> - {moment(blog.updatedAt).format('D MMM, YYYY')}
                        </h6>
                    </div>
                    <div className={`blog-content max-h-24 line-clamp-3 overflow-hidden ${index == 0 ? "text-center" : "text-left"}`}
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />

                </div>
            </Link>
            {approvalStatus === "pending" &&
                <div className="justify-center pb-5 flex gap-3">
                    <button onClick={() => handleApproval("approved")} disabled={loading} className='text-white bg-green-700 rounded-lg hover:bg-green-800 px-5 py-2 shadow-sm disabled:opacity-80'>Approve</button>
                    <button onClick={() => handleApproval("rejected")} disabled={loading} className='text-white bg-red-700 rounded-lg hover:bg-red-800 px-5 py-2 shadow-sm disabled:opacity-80'>Reject</button>
                    <button disabled={loading} className='text-white bg-slate-700 rounded-lg hover:bg-slate-800 px-5 py-2 shadow-sm disabled:opacity-80'>User</button>
                </div>
            }
            {approvalStatus === "rejected" &&
                <div className='bg-red-600 py-5'>
                    <h4 className='text-center text-white'>Rejected</h4>
                </div>

            }
        </div>
    )
};

export default BlogCard;

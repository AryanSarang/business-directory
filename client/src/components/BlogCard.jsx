import DOMPurify from 'dompurify';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

const BlogCard = ({ blog, index, recommended }) => {
    const navigate = useNavigate();
    const sanitizedContent = DOMPurify.sanitize(blog.content);
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
        </div>
    )
};

export default BlogCard;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import moment from 'moment';
import BlogCard from "../components/BlogCard";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Blog = () => {
    const encode = encodeURIComponent;
    const { blogUrl } = useParams();
    const [blog, setBlog] = useState("");
    const [relatedBlogs, setRelatedBlogs] = useState([]);
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
    }, [blogUrl]);

    useEffect(() => {
        const getRelatedBlogs = async () => {
            try {
                const res = await fetch(`/api/auth/getrelatedblogs?id=${blog._id}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setRelatedBlogs(data);
            } catch (error) {
                console.error('Error fetching related blogs:', error);
            }
        };
        if (blog._id) {
            getRelatedBlogs();
        }
    }, [blog._id]);
    const shareUrl = window.location.href;
    const whatsappShare = `https://wa.me/?text=${blog.title}%20${encodeURIComponent(shareUrl)}`;
    const twitterShare = `https://twitter.com/intent/tweet?text=${encode(blog.title)}&url=${encode(shareUrl)}`;
    const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encode(shareUrl)}`;
    const linkedinShare = `https://www.linkedin.com/shareArticle?mini=true&url=${encode(shareUrl)}&title=${encode(blog.title)}`;

    return (
        <HelmetProvider>
            <main className=" md:px-36 md:pt-20">

                <Helmet prioritizeSeoTags>
                    <title>{blog.title}</title>
                    <meta name="description" content={blog.content ? blog.content.substring(0, 150) : "Default description"} />

                    <meta property="og:title" content={blog.title} />
                    <meta property="og:description" content={blog.content ? blog.content.substring(0, 150) : "Default description"} />
                    <meta property="og:image" content={blog.featuredImage} />
                    <meta property="og:url" content={shareUrl} />
                    <meta property="og:type" content="article" />
                    <meta property="og:site_name" content="Site Name" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={blog.title} />
                    <meta name="twitter:description" content={blog.content ? blog.content.substring(0, 150) : "Default description"} />
                    <meta name="twitter:image" content={blog.featuredImage} />
                    <meta name="twitter:site" content="@twitterhandle" />
                    {blog.tags && blog.tags.length > 0 && blog.tags.map(tag => (
                        <meta key={tag} name="keywords" content={tag} />
                    ))}
                </Helmet>

                <div className="relative w-full">
                    <img src={blog.featuredImage} className="w-full h-full object-cover" />
                </div>
                <div className="md:px-52 px-4 py-5 bg-white">
                    <div className={`mb-4`}>
                        <h4 className='text-3xl font-semibold tracking-wider line-clamp-2'>{blog.title}</h4>
                        <h6 className="text-gray-500  text-sm mt-4">
                            <b>{blog.author}</b> - {moment(blog.updatedAt).format('D MMM, YYYY')}
                        </h6>
                    </div>
                    <div className="mt-4 flex gap-2 items-end">
                        <span className="text-lg font-bold ">Share </span>

                        <a href={whatsappShare}
                            target="_blank" rel="noopener noreferrer"
                            className=" text-blue-500 hover:text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill='#29A71A' height="25px" viewBox="0 0 512 512" width="25px"
                                className="transform hover:scale-125 transition-transform duration-200"><path d="m256 0c-141.363281 0-256 114.636719-256 256s114.636719 256 256 256 256-114.636719 256-256-114.636719-256-256-256zm5.425781 405.050781c-.003906 0 .003907 0 0 0h-.0625c-25.644531-.011719-50.84375-6.441406-73.222656-18.644531l-81.222656 21.300781 21.738281-79.375c-13.410156-23.226562-20.464844-49.578125-20.453125-76.574219.035156-84.453124 68.769531-153.160156 153.222656-153.160156 40.984375.015625 79.457031 15.96875 108.382813 44.917969 28.929687 28.953125 44.851562 67.4375 44.835937 108.363281-.035156 84.457032-68.777343 153.171875-153.21875 153.171875zm0 0" /><path d="m261.476562 124.46875c-70.246093 0-127.375 57.105469-127.40625 127.300781-.007812 24.054688 6.726563 47.480469 19.472657 67.75l3.027343 4.816407-12.867187 46.980468 48.199219-12.640625 4.652344 2.757813c19.550781 11.601562 41.964843 17.738281 64.816406 17.746094h.050781c70.191406 0 127.320313-57.109376 127.351563-127.308594.011718-34.019532-13.222657-66.003906-37.265626-90.066406-24.042968-24.0625-56.019531-37.324219-90.03125-37.335938zm74.90625 182.035156c-3.191406 8.9375-18.484374 17.097656-25.839843 18.199219-6.597657.984375-14.941407 1.394531-24.113281-1.515625-5.5625-1.765625-12.691407-4.121094-21.828126-8.0625-38.402343-16.578125-63.484374-55.234375-65.398437-57.789062-1.914063-2.554688-15.632813-20.753907-15.632813-39.59375 0-18.835938 9.890626-28.097657 13.398438-31.925782 3.511719-3.832031 7.660156-4.789062 10.210938-4.789062 2.550781 0 5.105468.023437 7.335937.132812 2.351563.117188 5.507813-.894531 8.613281 6.570313 3.191406 7.664062 10.847656 26.5 11.804688 28.414062.957031 1.917969 1.59375 4.152344.320312 6.707031-1.277344 2.554688-5.519531 8.066407-9.570312 13.089844-1.699219 2.105469-3.914063 3.980469-1.679688 7.8125 2.230469 3.828125 9.917969 16.363282 21.296875 26.511719 14.625 13.039063 26.960938 17.078125 30.789063 18.996094 3.824218 1.914062 6.058594 1.59375 8.292968-.957031 2.230469-2.554688 9.570313-11.175782 12.121094-15.007813 2.550782-3.832031 5.105469-3.191406 8.613282-1.914063 3.511718 1.273438 22.332031 10.535157 26.160156 12.449219 3.828125 1.917969 6.378906 2.875 7.335937 4.472657.960938 1.597656.960938 9.257812-2.230469 18.199218zm0 0" /></svg>
                        </a>
                        <a
                            href={twitterShare}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" text-blue-500 hover:text-blue-700"
                        >
                            <svg fill='black' enableBackground="new 0 0 32 32" width="25px" viewBox="0 0 1227 1227" xmlns="http://www.w3.org/2000/svg" className="transform hover:scale-125 transition-transform duration-200"><g><path d="m613.5 0c-338.815 0-613.5 274.685-613.5 613.5s274.685 613.5 613.5 613.5 613.5-274.685 613.5-613.5-274.685-613.5-613.5-613.5z"></path><path d="m680.617 557.98 262.632-305.288h-62.235l-228.044 265.078-182.137-265.078h-210.074l275.427 400.844-275.427 320.142h62.239l240.82-279.931 192.35 279.931h210.074l-285.641-415.698zm-335.194-258.435h95.595l440.024 629.411h-95.595z" fill="white"></path></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                        </a>
                        <a
                            href={facebookShare}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" text-blue-600 hover:text-blue-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill='#1976D2' id="Layer_2_1_" enableBackground="new 0 0 32 32" height="28px" viewBox="0 0 32 32" width="28px" className="transform hover:scale-125 transition-transform duration-200"><path d="m30 16c0 7.2-5.4 13.1-12.3 13.9v-10.8h3.3l.5-3.8h-3.7v-2.3c0-1.1.3-1.8 1.9-1.8h2v-3.5c-1-.1-1.9-.1-2.9-.1-2.9 0-4.9 1.8-4.9 5v2.8h-3.3v3.8h3.3v10.7c-6.8-1.1-11.9-6.9-11.9-13.9 0-7.7 6.3-14 14-14s14 6.3 14 14z" /></svg>
                        </a>
                        <a
                            href={linkedinShare}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:text-blue-900"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill='#0077B5' height="25px" viewBox="0 0 512 512" width="25px" className="transform hover:scale-125 transition-transform duration-200"><path d="m256 0c-141.363281 0-256 114.636719-256 256s114.636719 256 256 256 256-114.636719 256-256-114.636719-256-256-256zm-74.390625 387h-62.347656v-187.574219h62.347656zm-31.171875-213.1875h-.40625c-20.921875 0-34.453125-14.402344-34.453125-32.402344 0-18.40625 13.945313-32.410156 35.273437-32.410156 21.328126 0 34.453126 14.003906 34.859376 32.410156 0 18-13.53125 32.402344-35.273438 32.402344zm255.984375 213.1875h-62.339844v-100.347656c0-25.21875-9.027343-42.417969-31.585937-42.417969-17.222656 0-27.480469 11.601563-31.988282 22.800781-1.648437 4.007813-2.050781 9.609375-2.050781 15.214844v104.75h-62.34375s.816407-169.976562 0-187.574219h62.34375v26.558594c8.285157-12.78125 23.109375-30.960937 56.1875-30.960937 41.019531 0 71.777344 26.808593 71.777344 84.421874zm0 0" /></svg>
                        </a>
                    </div>
                    <div className={`blog-content mt-5`}
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />
                </div>
                <div className="text-center bg-white flex flex-col items-center gap-9 py-6">

                    <div className="flex flex-col gap-5">
                        <h3 className="text-3xl font-semibold tracking-wide">Related Blogs</h3>
                        <div className="items-center justify-center px-4 flex flex-col md:flex-row md:flex-wrap w-full">
                            {relatedBlogs.map((blog, index) => (
                                <div
                                    key={index}
                                    className="py-3 w-full md:basis-1/3 md:pe-2 md:ps-2"
                                >
                                    <BlogCard blog={blog} recommended={true} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link to={"/allblogs"}><button className="px-4 py-1 mx-2 flex gap-2 shadow-lg group border-slate-500 text-white bg-slate-500 rounded-md border-2 hover:bg-white hover:border-slate-500 hover:text-slate-500">
                        <svg height="25" className="fill-white group-hover:fill-slate-500" viewBox="0 0 64 64" width="25" fill="white" xmlns="http://www.w3.org/2000/svg" id="fi_3183354"><g id="Layer_27" data-name="Layer 27"><path d="m60 30h-51.17l8.58-8.59a2 2 0 0 0 -2.82-2.82l-12 12a2.06 2.06 0 0 0 -.59 1.8 2.16 2.16 0 0 0 .55 1l12 12a2 2 0 1 0 2.82-2.82l-8.54-8.57h51.17a2 2 0 0 0 0-4z"></path></g></svg>
                        Back to blogs</button></Link>
                </div>
            </main>
        </HelmetProvider>
    )
};

export default Blog;

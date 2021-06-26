import { HeartIcon } from '@heroicons/react/outline';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { context } from '../../App';
import Navbar from '../Shared/Navbar/Navbar';
import Spinner from '../Shared/Spinner/Spinner';

const BlogDetails = () => {

    const { blogs, loggedInUser, setBlogs } = useContext(context);

    const { id } = useParams();

    const history = useHistory();

    const [blog, setBlog] = useState({});

    const [loading, setLoading] = useState(true);

    const handleLike = likes => {
        if (loggedInUser.email){
            const liked = likes.find(liker => liker.email === loggedInUser.email);
            let newLikes  = [...likes, {email: loggedInUser.email, name: loggedInUser.name}];
            if (liked){
                newLikes = likes.filter(liker => liker.email !==liked.email);
            }
            fetch(`https://retro-blog.herokuapp.com/updateBlog/${id}`, {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({likes: newLikes})
            })
            .then(res=> res.json())
            .then(({inserted})=> {
                if(inserted){
                    setBlogs(preBlogs => {
                        const newBlogs = [...preBlogs];
                        const index = preBlogs.findIndex(blog=> blog._id===id);
                        newBlogs[index] = {...newBlogs[index], likes: newLikes};
                        return newBlogs;
                    })
                }
            })
        }
        else {
            history.replace("/login");
        }
    }

    useEffect(() => {
        const isBlog = blogs.find(blog => blog._id === id) || {};
        setBlog(isBlog);
        setLoading(false);
    }, [blogs, id])

    const { image, author, title, content, date, time, likes } = blog;

    const liked = likes?.find(liker => liker.email === loggedInUser.email);

    return (
        <div>
        <Navbar />
            <div className="container mx-auto">
                {
                    loading||!blogs.length?
                    <Spinner />
                    :blog._id?
                    <div className="p-3 text-justify">
                        <img className="rounded mx-auto" src={image} alt="" />
                        <h1 className="text-center my-2 text-xl font-semibold text-purple-900">{title}</h1>
                        <h3 className="mb-2 text-center text-md font-normal">Author: <span className='text-lg font-medium text-purple-900'>{author||'Saiful Islam Sojib'}</span></h3>
                        <h3 className='mb-2 text-center font-medium'>Published: {date||new Date().toDateString()} - {time||new Date().toTimeString()}</h3>
                        <button onClick={() => handleLike(likes)} className='block mx-auto focus:outline-none rounded-full font-medium relative text-red-400 hover:text-red-500'>
                            <HeartIcon className={`h-14 w-14 inline ${liked?'fill-current':''} cursor-pointer`} />
                            <span className={`absolute left-2/4 top-2/4 transform -translate-x-2/4 -translate-y-2/4 ${liked?"text-white":""} cursor-pointer`}>{likes?.length}</span>
                        </button>
                       <div className='mt-5'>
                        {
                            content?.split(/\n/)?.map((item, i)=> (
                                    <p key={i} className={item===''?'mb-4':'mb-1'}>{item}</p>
                            ))
                        }
                       </div>
                    </div>
                    :'Nai'
                }
            </div>
        </div>
    );
};

export default BlogDetails;
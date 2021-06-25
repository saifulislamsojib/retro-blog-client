import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { context } from '../../App';
import Navbar from '../Shared/Navbar/Navbar';

const BlogDetails = () => {

    const { blogs } = useContext(context);

    const { id } = useParams();

    const [blog, setBlog] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isBlog = blogs.find(blog => blog._id === id) || {};
        setBlog(isBlog);
        setLoading(false);
    }, [blogs, id])

    const { image, author, title, content, date, time } = blog;

    return (
        <div>
        <Navbar />
            <div className="container mx-auto">
                {
                    loading||!blogs.length?'loading...'
                    :blog._id?
                    <div className="p-3 text-justify">
                        <img className="rounded mx-auto" src={image} alt="" />
                        <h1 className="text-center my-2 text-xl font-semibold text-purple-900">{title}</h1>
                        <h3 className="mb-2 text-center text-md font-normal">Author: <span className='text-lg font-medium text-purple-900'>{author||'Saiful Islam Sojib'}</span></h3>
                        <h3 className='mb-5 text-center font-medium'>Published: {date||new Date().toDateString()} - {time||new Date().toTimeString()}</h3>
                       {
                           content?.split(/\n/)?.map((item, i)=> (
                                <p key={i} className={item===''?'mb-4':'mb-1'}>{item}</p>
                           ))
                       }
                    </div>
                    :'Nai'
                }
            </div>
        </div>
    );
};

export default BlogDetails;
import { HeartIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Blog = ({blog, manageBlog, handleDelete, handleLike}) => {

    const history = useHistory();

    const {title, image, author, _id, likes} = blog;

    return (
        <div className="p-3 shadow-md rounded-md">
            <img onClick={() => history.push(`/details/${_id}`)} className="rounded mb-2 cursor-pointer" src={image} alt="" />
            <Link to={`/details/${_id}`} className="text-xl font-semibold text-purple-900 hover:text-purple-700 hover:underline">{title}</Link>
            <div className="flex items-center justify-between my-2">
                <h3 className="mb-2 text-md font-normal">Author: <span className='text-lg font-medium text-purple-900'>{author||'Saiful Islam Sojib'}</span></h3>
                {manageBlog&&<button onClick={() => handleLike(likes)} className='focus:outline-none rounded-full font-medium relative text-red-400 hover:text-red-500'>
                    <HeartIcon className="h-14 w-14 inline fill-current cursor-pointer" />
                    <span className="absolute left-2/4 top-2/4 transform -translate-x-2/4 -translate-y-2/4 text-white cursor-pointer">{likes?.length}</span>
                </button>}
            </div>
            {manageBlog&&
            <div className='flex justify-between'>
                <button className='focus:outline-none hover:bg-blue-600 py-1 px-3 rounded text-purple-800 hover:text-white duration-200 focus:ring-2'>
                    <PencilAltIcon className='h-10 w-10' />
                </button>
                <button onClick={() => handleDelete(_id)} className='focus:outline-none hover:bg-red-600 py-1 px-3 rounded text-red-600 hover:text-white duration-200 focus:ring-2'>
                    <TrashIcon className='h-10 w-10' />
                </button>
            </div>}
        </div>
    );
};

export default Blog;
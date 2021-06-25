import { ExternalLinkIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Blog = ({blog, manageBlog, handleDelete}) => {

    const history = useHistory();

    const handleClick = _id => history.push(`/details/${_id}`);

    const {title, image, author, _id} = blog;

    return (
        <div className="p-3 shadow-md rounded-md">
            <img className="rounded" src={image} alt="" />
            <h1 className="my-2 text-xl font-semibold text-purple-900">{title}</h1>
            <h3 className="mb-2 text-md font-normal">Author: <span className='text-lg font-medium text-purple-900'>{author||'Saiful Islam Sojib'}</span></h3>
            {manageBlog?
            <div className='flex justify-between'>
                <button className='focus:outline-none hover:bg-blue-600 py-1 px-3 rounded text-purple-800 hover:text-white duration-200 focus:ring-2'>
                    <PencilAltIcon className='h-10 w-10' />
                </button>
                <button onClick={() => handleClick(_id)} className='focus:outline-none hover:bg-blue-600 py-1 px-3 rounded text-purple-800 hover:text-white duration-200 focus:ring-2'>
                    <ExternalLinkIcon className='h-10 w-10' />
                </button>
                <button onClick={() => handleDelete(_id)} className='focus:outline-none hover:bg-red-600 py-1 px-3 rounded text-red-600 hover:text-white duration-200 focus:ring-2'>
                    <TrashIcon className='h-10 w-10' />
                </button>
            </div>
            :<button onClick={() => handleClick(_id)} className="px-3 py-2 bg-blue-700 rounded text-gray-100 block ml-auto focus:outline-none focus:ring-2 hover:bg-blue-600">Read The Blog</button>}
        </div>
    );
};

export default Blog;
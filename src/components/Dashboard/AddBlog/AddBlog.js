import { UploadIcon } from '@heroicons/react/outline';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import swal from 'sweetalert';
import { context } from '../../../App';
import useForm from '../../../hooks/useForm';

const AddBlog = () => {

    const { handleInput, handleSubmit, error } = useForm(['title', 'content', 'image']);

    const [imageUrl, setImageUrl] = useState('');

    const { loggedInUser, setBlogs } = useContext(context);

    const submit = data => {
        const blogData = {...data, image: imageUrl, author: loggedInUser.name, date: new Date().toDateString(), time: new Date().toTimeString(), likes: []}
        toast.promise(
            fetch('https://retro-blog.herokuapp.com/addBlog', {
                method: 'POST',
                body: JSON.stringify(blogData),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(({inserted, _id}) => {
                if (inserted) {
                    swal("Blog Saved!", "Blog Saved Successfully", "success");
                    setBlogs(preBlogs=> [...preBlogs, {...blogData, _id}])
                }
                else {
                    swal("Blog Not Saved!", "Blog Not Saved", "error");
                }
            }),
            {
                loading: 'Saving...',
                success: <b>Saved Successfully!</b>,
                error: <b>Could not Saved.</b>,
            }
        )
    }

    const handleImageChange = e => {
        handleInput(e);
        setImageUrl('');
        const imageData = new FormData();
        imageData.set('key', "0ae387ec0608f508f230ca50fb391cbc")
        imageData.append('image', e.target.files[0]);
        toast.promise(
            fetch('https://api.imgbb.com/1/upload',{
                method: 'POST',
                body: imageData,
            })
            .then(res => res.json())
            .then(result => {
                setImageUrl(result.data.display_url);
            }),
            {
                loading: 'Uploading...',
                success: <b>Uploaded Successfully!</b>,
                error: <b>Could not uploaded.</b>,
            }
        )
    }

    return (
        <div>
            <Toaster />
            <form onSubmit={handleSubmit(submit)} className='mt-5 md:w-11/12 mx-auto'>
                <div className='text-right'>
                    <label htmlFor="cover-image" className={imageUrl?"bg-red-500 px-3 py-2 rounded text-gray-100 cursor-pointer hover:bg-blue-600 select-none":"bg-blue-500 px-3 py-2 rounded text-gray-100 cursor-pointer hover:bg-blue-600 select-none duration-200"}><UploadIcon className='h-6 w-6 inline mr-2' />{imageUrl?"Image Uploaded":"Upload Cover Image"}</label>
                    {error.image&&<span className="text-red-500 block mt-2 ml-2">Image Is Required</span>}
                </div>
                <input onChange={handleImageChange} className="hidden" type="file" name="image" id="cover-image" />
                <input 
                  onChange={handleInput} 
                  type="text" 
                  name='title'
                  autoComplete="title"
                  className="block w-full p-3 border-2 border-gray-400 rounded-md placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-indigo-500 text-2xl mt-5"
                  placeholder="Title"
                />
                {error.title&& <span className="text-red-500 block mt-2 ml-2">Title is required</span>}
                <textarea 
                  onChange={handleInput} 
                  name="content"
                  className="block blog-content w-full p-3 border-2 border-gray-400 rounded-md placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-indigo-500 text-lg mt-8"
                  placeholder="Write Blog Content"
                />
                {error.content&& <span className="text-red-500 block mt-2 ml-2">Content is required</span>}
                <input type="submit" value="Sava Blog" className='bg-purple-500 px-4 block ml-auto py-2 rounded text-gray-100 cursor-pointer hover:bg-blue-600 select-none duration-200 focus:ring-2 my-2' />
            </form>

        </div>
    );
};

export default AddBlog;
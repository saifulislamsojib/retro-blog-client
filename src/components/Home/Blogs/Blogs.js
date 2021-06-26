import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import { context } from '../../../App';
import ReactModal from '../../Dashboard/ReactModal/ReactModal';
import Spinner from '../../Shared/Spinner/Spinner';
import Blog from '../Blog/Blog';

const Blogs = ({manageBlog}) => {

    const { blogs, setBlogs } = useContext(context);

    const [modalIsOpen, setIsOpen] = useState(false);

    const [likes, setLikes] = useState([]);

    const handleLike = likes => {
        setLikes(likes);
        setIsOpen(preValue=> !preValue);
    };

    const handleDelete = _id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this blog!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                fetch(`https://retro-blog.herokuapp.com/deleteBlog/${_id}`, {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"}
                })
                .then(res=> res.json())
                .then(result => {
                    if (result) {
                        setBlogs(preBlogs => preBlogs.filter(blog => blog._id!== _id));
                        swal("Your blog has been deleted!", {icon: "success"});
                    }
                    else {
                        swal("Your blog not deleted!", {icon: "error"});
                    }
                })
            }
          });
    }

    return (
        <>
        {
            blogs.length===0?
            <Spinner />
            :<div className="container mx-auto">
                <h1 className="my-5 text-center text-3xl font-semibold text-blue-800">Blogs</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 mb-3">
                    {
                        blogs.map(blog => <Blog key={blog._id} blog={blog} manageBlog={manageBlog} handleDelete={handleDelete} handleLike={handleLike} />)
                    }
                </div>
            </div>
        }
        <ReactModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
            <ul>
                {
                    likes.map(({name, email}, index) => (
                        <li key={index}>
                            {index+1}.{' '}
                            <a href={`mailto:${email}`} className='hover:underline'>{name}</a>
                        </li>
                    ))
                }
            </ul>
        </ReactModal>
        </>
    );
};

export default Blogs;
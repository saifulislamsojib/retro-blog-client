import React, { useContext } from 'react';
import swal from 'sweetalert';
import { context } from '../../../App';
import Blog from '../Blog/Blog';

const Blogs = ({manageBlog}) => {

    const { blogs, setBlogs } = useContext(context);

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
                 
                setBlogs(preBlogs => preBlogs.filter(blog => blog._id!== _id))
            //   swal("Poof! Your imaginary file has been deleted!", {
            //     icon: "success",
            //   });
            }
          });
    }

    return (
        <div className="container mx-auto">
            <h1 className="my-5 text-center text-3xl font-semibold text-blue-800">Blogs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
                {
                    blogs.map(blog => <Blog key={blog._id} blog={blog} manageBlog={manageBlog} handleDelete={handleDelete} />)
                }
            </div>
        </div>
    );
};

export default Blogs;
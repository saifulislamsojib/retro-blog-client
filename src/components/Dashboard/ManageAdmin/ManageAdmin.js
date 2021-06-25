import { PlusCircleIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import swal from 'sweetalert';
import useForm from '../../../hooks/useForm';
import ReactModal from '../ReactModal/ReactModal';

const ManageAdmin = () => {

    const [modalIsOpen, setIsOpen] = useState(false);

    const [admins, setAdmins] = useState([]);

    const { handleInput, handleSubmit, error } = useForm(["name", "email"]);

    useEffect(() => {
        let unsubscribe = true;
        fetch('https://retro-blog.herokuapp.com/admins')
        .then(res => res.json())
        .then(data => unsubscribe&&setAdmins(data))
        return () => unsubscribe = false;
    }, [])

    const submit = data => {
        toast.promise(
        fetch('https://retro-blog.herokuapp.com/addAdmin', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(({inserted, _id}) => {
            if (inserted){
                setAdmins(preAdmins=> [...preAdmins, {...data, _id}])
                swal("Admin Added!", "Admin Added Successfully", "success");
            }
            else{
                swal("Admin Not Added!", "Admin Not Added", "error");
            }
        }),
        {
            loading: 'Saving...',
            success: <b>Saved Successfully!</b>,
            error: <b>Not Saved!</b>
        })
    }

    return (
        <div className="mt-5">
            <Toaster />
            <button onClick={() => setIsOpen(true)} className="block ml-auto bg-purple-600 text-white px-5 py-2 rounded-md mr-5 focus:outline-none focus:ring-2 flex">
                <PlusCircleIcon className="w-6 h-6 mr-1" />
                Add Admin
            </button>
            
            <div className="table-outer">
                <table className='table-auto border-collapse border mx-auto mt-5 table-auto overflow-auto'>
                    <thead>
                        <tr>
                            <th className="border p-2">Number</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admins.map(({_id, email, name}, index) => (
                                <tr key={_id}>
                                    <td className="border p-2 text-center">{index+1}</td>
                                    <td className="border p-2">{name}</td>
                                    <td className="border p-2">{email}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <ReactModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
                <form className="" onSubmit={handleSubmit(submit)}>
                    <input 
                      onChange={handleInput}
                      autoComplete="user-name"
                      type="text"
                      name="name"
                      className="block w-full mt-2 mb-3 p-3 border-b-2 border-gray-600 rounded-md placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Name"
                    />
                    {error.name&&<span className="text-red-500 block mt-2 ml-2">Name is required</span>}
                    <input
                      onChange={handleInput}
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="block w-full p-3 border-b-2 border-gray-600 rounded-md placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Email"
                    />
                    {error.email&&<span className="text-red-500 block mt-2 ml-2">Valid email is required</span>}
                    <input
                      type="submit"
                      value="Add Admin"
                      className="py-2 mt-3 px-3 rounded-md cursor-pointer block ml-auto bg-blue-500 text-white focus:ring-2"
                    />
                </form>
            </ReactModal>
        </div>
    );
};

export default ManageAdmin;
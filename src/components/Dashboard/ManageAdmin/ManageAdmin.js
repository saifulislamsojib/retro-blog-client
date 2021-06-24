import { PlusCircleIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import ReactModal from '../ReactModal/ReactModal';

const ManageAdmin = () => {

    const [modalIsOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-5">
            <button onClick={() => setIsOpen(true)} className="block ml-auto bg-purple-600 text-white px-5 py-2 rounded-md mr-5 focus:outline-none focus:ring-2 flex">
                <PlusCircleIcon className="w-6 h-6 mr-1" />
                Add Admin
            </button>
            <ReactModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
                
            </ReactModal>
        </div>
    );
};

export default ManageAdmin;
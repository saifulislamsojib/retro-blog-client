import { XIcon } from '@heroicons/react/outline';
import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      border                : 'none',
      boxShadow             : '5px 5px 20px lightgray',
      borderRadius          : '10px'
    }
};

Modal.setAppElement('#root');

const ReactModal = ({children, modalIsOpen, setIsOpen}) => {

  const closeModal = () => {
    setIsOpen(false);
  }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <button onClick={closeModal} className="block ml-auto py-1 px-2 bg-red-500 text-white rounded focus:outline-none focus:ring-2">
                    <XIcon className='h-8 w-8' />
                </button>
                {children}
            </Modal>
        </div>
    );
};

export default ReactModal;
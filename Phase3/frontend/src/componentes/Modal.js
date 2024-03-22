import React from 'react';

const Modal = ({isVisable, onClose, children}) => {
    if (!isVisable) return null;
    const handleOutsideClick = (e) => {
        if (e.target.id === "modal") onClose();
    }
    return (
        <div className="fixed inset-0 bg-neutral bg-opacity-30 backdrop-blur-sm flex justify-center items-center" id="modal" onClick={handleOutsideClick} >
            <div className="w-[600px] flex flex-col">
                <button className="text-white place-self-end" onClick={() => onClose()}>X
                </button>
                <div className="bg-base-100 shadow-xl rounded-md p-6">{children}</div>
            </div>
        </div>
    );
}
export default Modal;
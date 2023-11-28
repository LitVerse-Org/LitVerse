/* Modal.jsx */
import React from 'react';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null; // Don't render anything if the modal isn't open

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg relative">
                {children}
                <button onClick={onClose} className="absolute top-0 right-0 p-2">X</button>
            </div>
        </div>
    );
}

export default Modal;

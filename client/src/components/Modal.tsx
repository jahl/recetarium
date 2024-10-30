import React, { useState } from 'react';

interface TModal {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
}

const Modal : React.FC<TModal> = ({ isOpen, title, onClose, onSubmit, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900" >
            &times;
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
        <div className={`flex ${onSubmit ? 'justify-between' : 'justify-end' } p-4 border-t`}>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Close
          </button>
          {
            onSubmit ? (
              <button
                onClick={onSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Submit
              </button>
            ) : null
          }
          
        </div>
      </div>
    </div>
  )
}

export default Modal;
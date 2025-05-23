import React from 'react'

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black opacity-50'
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className='relative z-50 p-4 w-full max-w-2xl max-h-full'>
        <div className='bg-white rounded-lg shadow-lg'>
          {/* Modal Header */}
          <div className='flex items-center justify-between p-4 border-b border-gray-200 rounded-t'>
            <h3 className='text-lg font-medium text-gray-900'>{title}</h3>
            <div className='px-2  hover:bg-black/20 rounded-md'>
              <button
                type='button'
                className='text-gray-500 hover:text-gray-800 text-xl font-bold'
                onClick={onClose}
              >
                &times;
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className='p-4'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

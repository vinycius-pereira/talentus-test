import React from 'react';
import { IoClose } from "react-icons/io5";


export function Modal(props) {

    const {
        children,
        modalIsOpen,
        toggleModal,
    } = props

    return (
        <>
            {modalIsOpen && (
                <div className='fixed inset-0'>
                    <div
                        onClick={toggleModal}
                        className='bg-gray-900 bg-opacity-70 fixed inset-0'
                    ></div>
                    <div
                        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-100 text-black p-6 rounded-lg min-w-[50%] min-h-[25%]'
                    >
                        <div
                            onClick={toggleModal}
                            className='bg-red-600 rounded-full p-4 absolute -top-7 -right-7 m-4 cursor-pointer text-white'
                        >
                            <IoClose />
                        </div>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}
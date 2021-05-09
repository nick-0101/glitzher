// App
import React, { useState } from 'react';
import { withRouter } from "react-router-dom";

// Components
import SearchModal from '../SearchModal/SearchModal';

// Images 
// import logo from './images/logo.png'

const SubNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Search Modal
    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () =>{
        setIsOpen(false);
    }

    return (
    <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                <div className="flex justify-start">
                    <a href='/'>
                        <img
                            className="h-8 w-auto sm:h-10"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Glitzher Logo"
                        />
                    </a>
                </div>
                <div onClick={openModal} className="flex justify-center justify-end w-full ml-4 md:ml-7 cursor-pointer">
                    <div className="w-full flex flex-row h-14 rounded-lg border border-gray-300 text-gray-500 focus:outline-none">
                        <p className="text-gray-400 px-4 pt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </p> 
                        <p className="mt-4 text-gray-500 font-base">Enter a product title...</p>
                    </div>
                </div>
                <SearchModal isOpen={isOpen} closeModal={closeModal} openModal={isOpen} />
            </div>
        </div>
    </>
    );
}

export default withRouter(SubNav);



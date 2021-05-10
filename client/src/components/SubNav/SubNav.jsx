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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 border-b-2 border-gray-100">
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
                <div onClick={openModal} className="flex justify-end w-full ml-4 md:ml-7 cursor-pointer">
                    <div className="flex">
                        <button className="bg-red-500 hover:bg-red-600 rounded-md text-white p-3 focus:outline-none">
                            <p className="font-semibold text-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </p>
                        </button>
                    </div>
                </div>
                <SearchModal isOpen={isOpen} closeModal={closeModal} openModal={isOpen} />
            </div>
        </div>
    </>
    );
}

export default withRouter(SubNav);



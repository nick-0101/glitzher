// App
import React, { useState } from 'react';
import { withRouter } from "react-router-dom";

// Components
import SearchModal from '../SearchModal/SearchModal';

const ComparisonSearch = () => {
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
        <div className="flex justify-center h-screen/1 max-w-7xl mx-auto px-4 sm:px-20 text-center bg-hero">
            <div className="w-3/3 md:w-2/3 flex flex-col mx-auto my-44">
                <div className="text-4xl md:text-5xl font-medium text-gray-800 mb-8 leading-tight">
                    Compare cosmetic price's across <span style={{color: '#EF4444'}}>major brands.</span>
                </div>
                <div className="flex flex-row cursor-pointer bg-white" onClick={openModal}>
                    <div className="flex flex-grow w-auto rounded-md border border-gray-300 p-2 rounded-br-none rounded-tr-none">
                        <span className="p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <input 
                            disabled
                            className="w-full p-2 bg-white cursor-pointer focus:outline-none disabled" 
                            type="text" 
                            placeholder="Enter a product title..."
                            autoComplete="on"
                            autoCorrect="on"
                            spellCheck="true"
                        />
                    </div>
                    <div className="flex">
                        <button className="focus:outline-none rounded-bl-none rounded-tl-none bg-red-500 hover:bg-red-600 rounded-md text-white px-5">
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

export default withRouter(ComparisonSearch);

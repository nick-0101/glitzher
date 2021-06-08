// App
import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { animateScroll as scroller } from 'react-scroll'

// Icons
import { SearchIcon, ArrowDownIcon } from '@heroicons/react/outline'

// Components
import SearchModal from '../SearchModal/SearchModal';


const ComparisonSearch = () => {
    const [isOpen, setIsOpen] = useState(false);

    const executeScroll = () => {
        scroller.scrollTo(920, {
            duration: 0,
            delay: 0,
            smooth: true
        })
    }

    // Search Modal
    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () =>{
        setIsOpen(false);
    }


    return (
    <>  
        <div className="bg-no-repeat bg-center bg-cover bg-mobile md:bg-desktop">
            <div className="flex justify-center h-screen/1 max-w-7xl mx-auto px-4 sm:px-20 text-center">
                <div className="w-3/3 md:w-2/3 flex flex-col m-auto">
                    <div className="font-gilroy text-5xl text-gray-800 mb-4 leading-tight hidden lg:flex">
                        Find the best prices on Canadian cosmetics.
                    </div>
                    <div className="font-gilroy text-4xl text-gray-800 mb-4  leading-tight visible lg:hidden">
                        Compare prices on Canadian cosmetics
                    </div>
                    <div className="flex flex-row cursor-pointer" onClick={openModal}>
                        <div className="flex flex-grow w-auto rounded-md bg-white border border-gray-300 p-2 rounded-br-none rounded-tr-none">
                            <span className="px-2 pt-2.5">
                                <SearchIcon className="text-gray-400 h-5 w-5" aria-hidden="true" />
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
                            <div className="focus:outline-none p-4 rounded-bl-none rounded-tl-none bg-red-500 hover:bg-red-600 rounded-md text-white px-5">
                                <div className="pt-1">
                                    <SearchIcon className="text-white h-5 w-5" aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <SearchModal isOpen={isOpen} closeModal={closeModal} openModal={isOpen} />
                    <a onClick={executeScroll} href="#popular-products" className="z-0 mx-auto my-12 md:py-0 animate-bounce cursor-pointer" name="skip-to-content">
                        <ArrowDownIcon className="text-gray-900 w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </div>
    </>
    );
}

export default withRouter(ComparisonSearch);

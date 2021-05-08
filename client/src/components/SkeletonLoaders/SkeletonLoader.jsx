import React from 'react';

const SkeletonLoader = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-20 text-center grid grid-cols-1 px-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
            {arr.map((index) => {
                return (       
                    <div className="flex flex-col h-96 text-center mt-5 mx-2 border-b-2 border-gray-100" key={index}>
                        <div className="animate-pulse flex">
                            <div className="bg-gray-200 h-44 w-screen"></div>
                        </div>
                        <div className="px-4 pt-3 text-left animate-pulse">
                            <div className="mt-2 font-medium truncate h-5 bg-gray-200 rounded w-4/4"></div>
                            <div className="mt-2 h-5 bg-gray-200 rounded w-4/4"></div>
                            <div className="mt-2 text-2xl h-8 bg-gray-200 rounded w-2/4"></div>
                            <div className="mt-2 text-sm truncate h-5 bg-gray-200 rounded w-4/4"></div>
                            <div className="flex">
                                <a href="/" className="h-10 bg-gray-200 rounded w-4/4 mt-2 w-screen text-center px-4 py-2 rounded-md">
                                    
                                </a>
                            </div>
                        </div>
                    </div>
                )
            })} 
        </div>
    )
}

export default SkeletonLoader;
import React from 'react';

const ComparisonSkeleton = () => {
    return (
        <div className="flex flex-col mt-5 mx-2 max-w-7xl mx-auto px-4 sm:px-20 text-center">
            <div className="animate-pulse flex">
                <div className="h-10 bg-gray-200 w-screen md:w-4/4 mt-2 rounded-md"></div>
            </div>
            <div className="animate-pulse mt-5">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 lg:w-2/4 mb-4">
                        <div className="bg-gray-200 h-80 rounded"></div>
                    </div>
                    <div className="w-3/4 mx-auto md:w-1/2 mx-0 lg:w-2/4 mx-0">
                        <div className="h-10 bg-gray-200 rounded ml-0 md:ml-5 rounded-md"></div>
                        <div className="h-10 bg-gray-200 rounded mt-3 ml-0 md:ml-5 rounded-md"></div>
                        <div className="border-b text-gray-400 mt-3 ml-0 md:ml-5"></div>
                        <div className="h-10 bg-gray-200 rounded mt-3 ml-0 md:ml-5 rounded-md"></div>
                        <div className="border-b text-gray-400 mt-3 ml-0 md:ml-5"></div>
                        <div className="h-10 bg-gray-200 rounded w-auto mt-3 ml-0 md:ml-5 rounded-md md:w-64"></div>
                        <div className="h-10 bg-gray-200 rounded w-auto mt-3 ml-0 md:ml-5 rounded-md md:w-64"></div>
                    </div>
                </div>
                <div className="border-b text-gray-400 mt-2 mb-5"></div>
                <div className="h-10 bg-gray-200 rounded rounded-md"></div>
                <div className="mt-5 w-full mb-4">
                    <div className="bg-gray-200 h-52 rounded"></div>
                </div>
            </div>
        </div> 
    )
}

export default ComparisonSkeleton;
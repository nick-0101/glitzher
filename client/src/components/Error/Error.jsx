import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center h-screen/2">
            <div className="my-20">
                <h1 className="text-9xl font-bold text-gray-900 my-5">404</h1>
                <p className="text-base">We're sorry, we couldn't find the page you were looking for :(</p>
                <Link to="/">
                    <div className="mt-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600">Return Home</div>
                </Link>
            </div>
        </div>
    )
}


export default Error;
import React from 'react';

const PostSkeleton = () => {
  return (
    <div className='flex flex-col mt-5 max-w-5xl mx-auto my-12 sm:px-6'>
      <div className='animate-pulse mt-5'>
        <div className='mt-1 font-medium truncate h-5 bg-gray-300 rounded w-full md:w-2/4'></div>
        <div className='mt-3 font-medium truncate h-10 bg-gray-300 rounded w-full md:w-3/4'></div>
        <div className='mt-4 font-medium truncate h-5 bg-gray-300 rounded w-full md:w-2/4'></div>
        <div className='mt-4 bg-gray-300 h-96 w-full md:w-3/4 rounded'></div>

        <div className='mt-4 font-medium truncate h-5 bg-gray-300 rounded w-full md:w-4/4'></div>
        <div className='mt-4 font-medium truncate h-5 bg-gray-300 rounded w-full md:w-3/4'></div>
        <div className='mt-9 font-medium truncate h-5 bg-gray-300 rounded w-full md:w-4/4'></div>
        <div className='mt-4 font-medium truncate h-5 bg-gray-300 rounded w-full md:w-4/4'></div>
        <div className='mt-4 font-medium truncate h-5 bg-gray-300 rounded w-full md:w-4/4'></div>
        <div className='mt-4 font-medium truncate h-5 bg-gray-300 rounded w-full md:w-4/4'></div>
      </div>
    </div>
  );
};

export default PostSkeleton;

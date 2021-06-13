import React from 'react';

const FrontpageSkeleton = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <div
      className='grid gap-8 grid-cols-1 lg:grid-cols-3 md:grid-cols-3
          sm:grid-cols-2'
    >
      {arr.map((index) => {
        return (
          <div className='h-96 mt-5 mx-2' key={index}>
            <div className='animate-pulse flex'>
              <div className='bg-gray-300 h-44 w-screen rounded'></div>
            </div>
            <div className='pt-3 text-left animate-pulse'>
              <div className='mt-1 font-medium truncate h-5 bg-gray-300 rounded w-2/4'></div>
              <div className='mt-3 font-medium truncate h-5 bg-gray-300 rounded w-4/4'></div>
              <div className='mt-3 font-medium truncate h-20 bg-gray-300 rounded w-4/4'></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FrontpageSkeleton;

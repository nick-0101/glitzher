import React from 'react';
import Link from 'next/link';

const FooterBar = () => {
  return (
    <>
      <footer className='bg-white mt-10'>
        <div className='border-t-2 border-gray-100 items-center'>
          <div className='py-6 flex justify-center'>
            <div className='hidden md:flex flex-row items-center'>
              <span className='m-2'>
                <Link href='https://glitzher.com/tos'>
                  <a>
                    <p className='text-base font-medium text-gray-500 hover:text-gray-900 text-md'>
                      Terms of Service
                    </p>
                  </a>
                </Link>
              </span>
              •
              <p className='text-base font-medium text-gray-900 text-md m-2'>
                Copyright © {new Date().getFullYear()} Glitzher All Rights
                Reserved
              </p>
              •
              <span className='m-2'>
                <Link href='https://glitzher.com/policies/privacy'>
                  <a>
                    <p className='text-base font-medium text-gray-500 hover:text-gray-900 text-md'>
                      Privacy Policy
                    </p>
                  </a>
                </Link>
              </span>
            </div>
            {/* Mobile */}
            <div className='flex flex-col items-center md:hidden'>
              <div className='flex flex-row'>
                <span className='m-2'>
                  <Link href='https://glitzher.com/tos'>
                    <a>
                      <p className='text-base font-medium text-gray-500 hover:text-gray-900 text-md'>
                        Terms of Service
                      </p>
                    </a>
                  </Link>
                </span>
                <span className='m-2'>
                  <Link href='https://glitzher.com/policies/privacy'>
                    <a>
                      <p className='text-base font-medium text-gray-500 hover:text-gray-900 text-md'>
                        Privacy Policy
                      </p>
                    </a>
                  </Link>
                </span>
              </div>
              <p className='text-base font-medium text-gray-900'>
                Copyright © {new Date().getFullYear()} Glitzher All Rights
                Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterBar;

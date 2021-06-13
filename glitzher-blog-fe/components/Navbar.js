import { Popover, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Link from 'next/link';
import {
  TagIcon,
  ShoppingBagIcon,
  MenuIcon,
  SearchIcon,
  XIcon,
  PencilAltIcon,
} from '@heroicons/react/outline';

import logo from './images/nav-logo.webp';
import text from './images/nav-text.webp';

// Nav Items
const solutions = [
  {
    name: 'Popular Products',
    description: 'View popular cosmetic products.',
    href: 'https://glitzher.com/popular-products',
    icon: TagIcon,
  },
  {
    name: 'Brands',
    description: 'All the brands we collect products from.',
    href: 'https://glitzher.com/brands',
    icon: ShoppingBagIcon,
  },
  {
    name: 'Blog',
    description:
      'Discover the Glitzher blog. Here we write about cosmetic reviews, beauty tips and tricks and the best product deals.',
    href: 'https://glitzher.com/brands',
    icon: PencilAltIcon,
  },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Search Modal
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <header>
      <Popover className='relative bg-white z-40'>
        {({ open }) => (
          <>
            <div className='max-w-7xl mx-auto px-4 sm:px-6'>
              <div className='flex justify-between items-center border-b-2 border-gray-100 py-3 md:justify-start md:space-x-10'>
                {/* Logo */}
                <div className='flex flex-row justify-start'>
                  <Link href='/'>
                    <a>
                      <div className='flex flex-row mt-1'>
                        <div>
                          <img
                            className='h-8 w-auto sm:h-10'
                            src={logo}
                            width='auto'
                            height='auto'
                            alt='Glitzher Logo'
                          />
                        </div>
                        <div className='m-auto hidden md:flex'>
                          <img
                            className='w-auto sm:h-12'
                            src={text}
                            width='auto'
                            height='auto'
                            alt='Glitzher text'
                          />
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>

                {/* Mobile SearchBar */}
                <Link href='https://glitzher.com'>
                  <a className='flex flex-grow items-center border p-1.5 mx-3 border-gray-300 rounded-md md:hidden cursor-pointer'>
                    <div className='flex'>
                      <span className='px-2 pt-2.5'>
                        <SearchIcon
                          className='text-gray-400 h-5 w-5'
                          aria-hidden='true'
                        />
                      </span>
                      <input
                        disabled
                        className='w-full p-2 bg-white cursor-pointer focus:outline-none disabled'
                        type='text'
                        placeholder='Enter a product title...'
                        autoComplete='on'
                        autoCorrect='on'
                        spellCheck='true'
                      />
                    </div>
                  </a>
                </Link>

                {/* Mobile Icon */}
                <div className='-mr-2 -my-2 md:hidden'>
                  <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400'>
                    <span className='sr-only'>Open menu</span>
                    <MenuIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>

                {/* Desktop Menu Items */}
                <Popover.Group as='nav' className='hidden md:flex space-x-10'>
                  <Link href='https://glitzher.com/popular-products'>
                    <a>
                      <div className='flex'>
                        <span className='text-base font-medium text-gray-500 hover:text-gray-900'>
                          Popular Products
                        </span>
                      </div>
                    </a>
                  </Link>

                  <Link href='https://glitzher.com/brands'>
                    <a>
                      <div className='flex'>
                        <span className='text-base font-medium text-gray-500 hover:text-gray-900'>
                          Brands
                        </span>
                      </div>
                    </a>
                  </Link>

                  <Link href='https://glitzher.com/blog'>
                    <a>
                      <div className='flex'>
                        <span className='text-base font-medium text-gray-500 hover:text-gray-900'>
                          Blog
                        </span>
                      </div>
                    </a>
                  </Link>
                </Popover.Group>

                {/* Seperator */}
                <div className='hidden md:flex justify-between lg:w-1/5'></div>

                {/* Desktop SearchBar */}
                <Link href='https://glitzher.com'>
                  <a className='hidden md:flex items-center border p-1.5 border-gray-300 rounded-md cursor-pointer md:flex-1 lg:w-0'>
                    <div className='flex'>
                      <span className='px-2 pt-2.5'>
                        <SearchIcon
                          className='text-gray-400 h-5 w-5'
                          aria-hidden='true'
                        />
                      </span>
                      <input
                        disabled
                        className='w-full p-2 bg-white cursor-pointer focus:outline-none disabled'
                        type='text'
                        placeholder='Enter a product title...'
                        autoComplete='on'
                        autoCorrect='on'
                        spellCheck='true'
                      />
                    </div>
                  </a>
                </Link>
              </div>
            </div>

            {/* Mobile Menu */}
            <Transition
              show={open}
              as={Fragment}
              enter='duration-200 ease-out'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='duration-100 ease-in'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Popover.Panel
                focus
                static
                className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
              >
                <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'>
                  <div className='pt-5 pb-6 px-5'>
                    <div className='flex items-center justify-between'>
                      <Link href='/'>
                        <a>
                          <div className='flex flex-row mt-1'>
                            <div className='mt-1'>
                              <img
                                className='h-10 w-auto'
                                src={logo}
                                width='auto'
                                height='auto'
                                alt='Glitzher Logo'
                              />
                            </div>
                            <img
                              className='h-14'
                              src={text}
                              width='auto'
                              height='auto'
                              alt='Glitzher text'
                            />
                          </div>
                        </a>
                      </Link>
                      <div className='-mr-2'>
                        <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400'>
                          <span className='sr-only'>Close menu</span>
                          <XIcon className='h-6 w-6' aria-hidden='true' />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className='mt-6'>
                      <nav className='grid gap-y-8'>
                        {solutions.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className='-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'
                          >
                            <item.icon
                              className='flex-shrink-0 h-6 w-6 text-red-500'
                              aria-hidden='true'
                            />
                            <span className='ml-3 text-base font-medium text-gray-900'>
                              {item.name}
                            </span>
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                  <Link href='https://glitzher.com'>
                    <a>
                      <div className='py-6 px-5 space-y-6'>
                        <div className='w-full flex items-center justify-center p-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600'>
                          <SearchIcon
                            className='flex-shrink-0 h-6 w-6 text-white'
                            aria-hidden='true'
                          />
                          <span className='ml-3'>Search</span>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </header>
  );
}

export default Navbar;

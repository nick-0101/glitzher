// import React from 'react';

const FooterBar = () => {
    return (
        <>
            {/* <Footer classNameName="footer">
                <Link href="/tos" title="Terms of Service">
                    <Text>Terms of Service</Text>
                </Link>
                <Row classNameName="breaker">|</Row>
                <Link href="/" title="Copyright">
                    <Text>Copyright ©{new Date().getFullYear()} Glitzher All Rights Reserved</Text>
                </Link>
                <Row classNameName="breaker">|</Row>
                <Link href="/polices/privacy" title="Privacy Policy">
                    <Text>Privacy Policy</Text>
                </Link>
            </div> */}
            <footer className="footer bg-white relative pt-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="border-t-2 border-gray-100 flex flex-col items-center">
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6">

                    <div className="sm:flex sm:mt-8">
                        <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-400 uppercase mb-2">Footer header 1</span>
                                <span className="my-2"><a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">link 1</a></span>
                                <span className="my-2"><a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">link 1</a></span>
                                <span className="my-2"><a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">link 1</a></span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-400 uppercase mt-4 md:mt-0 mb-2">Footer header 2</span>
                                <span className="my-2"><a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">link 1</a></span>
                                <span className="my-2"><a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">link 1</a></span>
                                <span className="my-2"><a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">link 1</a></span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-400 uppercase mt-4 md:mt-0 mb-2">Legal</span>
                                <span className="my-2"><a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900 text-md">Terms of Service</a></span>
                                <span className="my-2"><a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900 text-md">Privacy Policy</a></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="mt-16 border-t-2 border-gray-100 flex flex-col items-center">
                        <div className="sm:w-2/3 text-center py-6">
                            <p className="text-base font-medium text-gray-500 text-md">
                                Copyright © {new Date().getFullYear()} Glitzher All Rights Reserved
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default FooterBar;
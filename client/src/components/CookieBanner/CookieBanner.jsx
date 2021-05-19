import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Application Packages
import { LockClosedIcon } from '@heroicons/react/solid'
import Cookies from 'js-cookie';

const CookieBanner = () => {
    const [cookie, setCookie ] = useState(undefined) 

    // Consent to cookies
    const cookieConsented = () => {
        if(cookie === undefined) {
            Cookies.set('cookieconsent_status', 'ok', { expires: 182.5 });
            setCookie('ok')
        } else {
            setCookie(Cookies.get('cookieconsent_status'))
        }
    }

    // Check if consented to cookies
    useEffect(() => {
        const cookie_consent = Cookies.get('cookieconsent_status')

        if(cookie_consent === 'ok') {
            setCookie('ok')
        } else {
            setCookie(undefined)
        }
    }, [cookie, setCookie])


    return (<>
        {cookie === 'ok' ? null : 
            <div className="flex flex-col bg-white w-auto md:w-96 p-5 m-4 shadow-2xl rounded-md">
                <div className="flex text-white my-3">
                    <LockClosedIcon className="h-6 w-6 text-gray-900 my-auto" aria-hidden="true" /> 
                    <div className="text-lg font-medium text-gray-900 ml-1">Your Privacy</div>
                </div>
                <div className="flex flex-wrap content-center mb-3">
                    <div className="text-base text-gray-900">
                        We use cookies to enchance your experience.
                    </div>
                </div>
                <div className="flex flex-col md:flex-row text-center">
                    <div className="text-red-600 bg-red-100 md:w-3/6 mt-3 md:mr-3 hover:bg-red-200 font-medium px-7 py-3.5 rounded-md justify-center transition duration-300 ease-in-out">
                        <Link to="/policies/privacy">
                            Privacy Policy
                        </Link>
                    </div>
                    <div onClick={cookieConsented} className="text-base font-medium md:w-3/6	cursor-pointer mt-3 text-white bg-red-500 hover:bg-red-600 px-8 py-3.5 rounded-md transition duration-300 ease-in-out">
                        OK
                    </div>
                </div>
            </div>
        }
    </>);
}

export default CookieBanner;

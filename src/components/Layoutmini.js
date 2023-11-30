// Layoutmini.js
import React, { useState } from 'react';
import LeftNavBar from './LeftNavBar/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Layoutmini({ children }) {
    const [navVisible, setNavVisible] = useState(false);

    const toggleNav = () => {
        setNavVisible(!navVisible);
    };

    return (
        <div className="flex max-w-screen mx-auto min-h-screen relative">
            {navVisible && (
                // Updated: Add the border class to the LeftNavBar wrapper div
                <div className="fixed inset-y-0 left-0 z-10 w-48 border-8 border-amber-50">
                    <div className="bg-black-200 h-full text-zinc overflow-x-hidden">
                        <LeftNavBar />
                    </div>
                </div>
            )}
            <button
                className={`absolute top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-r z-20 ${navVisible ? 'left-48' : 'left-0'}`}
                onClick={toggleNav}
            >
                <FontAwesomeIcon icon={navVisible ? faArrowLeft : faArrowRight} className="text-white" />
            </button>
            <div className={`flex-grow transition-all duration-300 ${navVisible ? 'ml-48' : 'ml-0'}`}>
                <div className="p-2 flex justify-end">
                    <div className={`transition-all duration-300 w-full ${navVisible ? 'max-w-4xl' : ''}`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

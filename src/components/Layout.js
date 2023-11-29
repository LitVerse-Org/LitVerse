// Layout.js
import React from 'react';
import LeftNavBar from './LeftNavBar/index';
import RightNavBar from './RightNavBar 2/RightNavBar'; // Import the new RightSideBar component

export default function Layout({ children }) {
    return (
        <div className="grid grid-cols-12 max-w-screen mx-auto min-h-screen">
            <div className="col-span-3 bg-black-200 h-full pr-3 text-zinc">
                <LeftNavBar />
            </div>
            <div className="col-span-6 flex flex-col bg-gray-200 border-l border-r rl-stripe-bg">
                <div className="p-2 flex-grow">
                    {children}
                </div>
            </div>

            <RightNavBar /> {/* Use the RightSideBar component */}
        </div>
    );
}

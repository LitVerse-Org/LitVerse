// Layout.js
import React from 'react';
import LeftNavBar from './LeftNavBar/index';
import RightNavBar from './RightNavBar/RightNavBar'; // Import the new RightSideBar component

export default function Layout({ children }) {
    return (
        <div className="grid grid-cols-12 max-w-screen mx-auto min-h-screen">
            <div className="col-span-3 bg-black-200 h-full pr-3 text-zinc">
                <LeftNavBar />
            </div>
            <div className="col-span-6 bg-gray-200 h-full p-2 h-screen border-l border-r rl-stripe-bg">
                {children}
            </div>
            <RightNavBar /> {/* Use the RightSideBar component */}
        </div>
    );
}

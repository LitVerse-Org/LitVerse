import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import GuestSidebar from './GuestNavBar';
import Link from 'next/link';
import {
    faHome,
    faBell,
    faBookmark,
    faCog,
    faPen,
    faUser,
    faEnvelope,
    faUsers,
    faTrophy
} from '@fortawesome/free-solid-svg-icons';
import SettingsModal from './SettingsModal';

const Sidebar = () => {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const router = useRouter();
    const {data: session} = useSession();

    if(!session){

        return <GuestSidebar/>;
    }
    const toggleSettingsModal = () => {
        setIsSettingsModalOpen(!isSettingsModalOpen);
    };

    return (
        <div className="w-1/4 min-h-screen bg-black text-white fixed flex flex-col items-center">
            <Link href="/home">
                    <img src="/white_logo_dark_background.png" alt="Logo" className="w-50 mt-6 mb-4 cursor-pointer"/>
            </Link>
            <div className="flex items-center justify-center p-4 cursor-pointer text-xl hover:bg-gray-700 w-full" onClick={() => router.push('/home')}>
                <FontAwesomeIcon icon={faHome} className="text-2xl" />
                <span className="ml-2">Home</span>
            </div>
            <div className="flex items-center justify-center p-4 cursor-pointer text-xl hover:bg-gray-700 w-full" onClick={() => router.push('/communities')}>
                <FontAwesomeIcon icon={faUsers} className="text-2xl" />
                <span className="ml-2">Communities</span>
            </div>
            <div className="flex items-center justify-center p-4 cursor-pointer text-xl hover:bg-gray-700 w-full" onClick={() => router.push('/challenges')}>
                <FontAwesomeIcon icon={faTrophy} className="text-2xl" />
                <span className="ml-2">Challenges</span>
            </div>
            <div className="flex items-center justify-center p-4 cursor-pointer text-xl hover:bg-gray-700 hover:rounded-lg w-full" onClick={() => router.push('/notifications')}>
                <FontAwesomeIcon icon={faBell} className="text-2xl" />
                <span className="ml-2">Notifications</span>
            </div>
            <div className="flex items-center justify-center p-4 cursor-pointer text-xl hover:bg-gray-700 hover:rounded-lg w-full" onClick={() => router.push('/messages')}>
                <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
                <span className="ml-2">Messages</span>
            </div>
            <div className="flex items-center justify-center p-4 cursor-pointer text-xl hover:bg-gray-700 hover:rounded-lg w-full" onClick={() => router.push('/bookmarks')}>
                <FontAwesomeIcon icon={faBookmark} className="text-2xl" />
                <span className="ml-2">Bookmarks</span>
            </div>
            <div className="flex items-center justify-center p-4 cursor-pointer text-xl hover:bg-gray-700 hover:rounded-lg w-full" onClick={() => router.push('/profile')}>
                <FontAwesomeIcon icon={faUser} className="text-2xl" />
                <span className="ml-2">Profile</span>
            </div>
            <div className="flex items-center justify-center p-4 cursor-pointer text-xl hover:bg-gray-700 hover:rounded-lg w-full" onClick={toggleSettingsModal}>
                <FontAwesomeIcon icon={faCog} className="text-2xl" />
                <span className="ml-2">Settings</span>
            </div>
            <div className="flex items-center justify-center p-4 cursor-pointer text-xl w-full mt-auto">
                <button className="bg-green-600 text-white px-3 py-4 rounded-full transition hover:bg-green-700 hover:rounded-full w-3/4" onClick={() => router.push('/createPost')}>
                    <FontAwesomeIcon icon={faPen} className="text-2xl" />
                </button>
            </div>

            <SettingsModal
                show={isSettingsModalOpen}
                onClose={toggleSettingsModal}
            />
        </div>
    );
};

export default Sidebar;

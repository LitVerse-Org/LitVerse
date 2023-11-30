import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import SettingsModal from './SettingsModal';

const GuestSidebar = () => {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const router = useRouter();
    
    const toggleSettingsModal = () => {
        setIsSettingsModalOpen(!isSettingsModalOpen);
    };
    return (
        <div className="w-1/4 min-h-screen bg-black text-white fixed flex flex-col items-center">
            <Link href="/home">
                    <img src="/white_logo_transparent_background.png" alt="LITVERSE" className="w-50 mt-6 mb-4 cursor-pointer"/>
            </Link>
        
            <div className="flex items-center justify-center p-4 cursor-pointer text-xl hover:bg-gray-700 hover:rounded-lg w-full" onClick={toggleSettingsModal}>
                <FontAwesomeIcon icon={faCog} className="text-2xl" />
                <span className="ml-2">Settings</span>
            </div>
            
            <SettingsModal
                show={isSettingsModalOpen}
                onClose={toggleSettingsModal}
            />
        </div>
    );
};

export default GuestSidebar;

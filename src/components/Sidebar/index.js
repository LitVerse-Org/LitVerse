import React, { useState } from 'react';
import styles from './sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome,  
  faBell, 
  faBookmark, 
  faCog, 
  faPen, 
  faUser, 
  faEnvelope 
} from '@fortawesome/free-solid-svg-icons'; 
import SettingsModal from './SettingsModal';
import Link from 'next/link';

const SidebarItem = ({ icon, label, onClick }) => {
    return (
        <div className={styles.sidebarItem} onClick={onClick}>
            <FontAwesomeIcon icon={icon} color="#000"/>
            <span className={styles.sidebarLabel}>{label}</span>
        </div>
    );
};

const Sidebar = () => {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const toggleSettingsModal = () => {
        setIsSettingsModalOpen(!isSettingsModalOpen);
    };

    return (
        <div className={styles.sidebarContainer}>
            <SidebarItem icon={faHome} label="Home" />
            <SidebarItem icon={faBell} label="Notifications" />
            <SidebarItem 
                icon={faUser} 
                label="Profile"
                onClick={() => {
                    const { useRouter } = require('next/router');
                    const router = useRouter();
                    router.push('/profile');
                }} 
            />
            <SidebarItem icon={faEnvelope} label="Messages" />
            <SidebarItem icon={faBookmark} label="Bookmarks" />
            <SidebarItem 
                icon={faCog} 
                label="Settings"
                onClick={toggleSettingsModal} 
            />
            <div className={styles.sidebarItem}>
                <button className={styles.composeButton}>
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </div>
            <SettingsModal 
                show={isSettingsModalOpen} 
                onClose={toggleSettingsModal}
            />
        </div>
    );
}

export default Sidebar;

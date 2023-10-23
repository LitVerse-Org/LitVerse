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

const Sidebar = () => {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const toggleSettingsModal = () => {
        setIsSettingsModalOpen(!isSettingsModalOpen);
    };

    // No need for handleProfileIconClick function as we are directly using the Link component

    return (
        <div className={styles.sidebarContainer}>
            <FontAwesomeIcon icon={faHome} className={styles.sidebarItem} />  
            <FontAwesomeIcon icon={faBell} className={styles.sidebarItem} /> 
            <span 
            className={styles.sidebarItem}
                onClick={() => {
            // Use Next.js's router to programmatically navigate
                const { useRouter } = require('next/router');
                const router = useRouter();
                router.push('/profile');
            }}
> 
                <FontAwesomeIcon icon={faUser} />
                </span>

            <FontAwesomeIcon icon={faEnvelope} className={styles.sidebarItem} />
            <FontAwesomeIcon icon={faBookmark} className={styles.sidebarItem} />
            <FontAwesomeIcon icon={faCog} className={styles.sidebarItem}
                onClick={toggleSettingsModal} />
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
};

export default Sidebar;

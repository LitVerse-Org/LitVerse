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
import SettingsModal from './settingsModal';

const Sidebar = () => {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const toggleSettingsModal = () => {
        setIsSettingsModalOpen(!isSettingsModalOpen);
    };

    return (
        <div className={styles.sidebarContainer}>
            <FontAwesomeIcon icon={faHome} className={styles.sidebarItem} />  
            <FontAwesomeIcon icon={faBell} className={styles.sidebarItem} /> 
            <FontAwesomeIcon icon={faUser} className={styles.sidebarItem} /> 
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

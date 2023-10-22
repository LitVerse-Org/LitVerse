/** Hey guys I provided a brief exeplination about this 
 * SettingsModal Component:
 *
 * A modal component that displays a settings cog icon. 
 * Upon clicking the icon, a dropdown menu is shown, providing options 
 * to either log out of the application or delete the user's account.
 * 
 * Props:
 * - show: A boolean that determines if the modal should be visible.
 * - onClose: A callback function to be executed when certain actions in the modal occur.
 * 
 * State:
 * - dropdownVisible: A boolean that determines if the dropdown menu should be visible.
 *
 * Functions:
 * - handleLogout: Logs the user out of the application.
 * - handleDeleteAccount: Simulates deleting a user's account and then closes the modal.
 * - toggleDropdown: Toggles the visibility of the dropdown menu.
 */

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { signOut } from "next-auth/react";

export default function SettingsModal({ show, onClose }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  const handleLogout = () => {
    signOut(); 
  };
  
  const handleDeleteAccount = () => {
    console.log("Account deleted"); 
    onClose(); 
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        
        {/* Cog Icon */}
        <FontAwesomeIcon icon={faCog} className={`settings-icon ${dropdownVisible ? 'active' : ''}`} onClick={toggleDropdown} />
        
        {/* Dropdown Menu */}
        {dropdownVisible && (
          <div className="dropdown-box">
            <button onClick={handleDeleteAccount}>Delete account</button>
            <br />
            <button onClick={handleLogout}>Log Out</button>
          </div>
        )}
        
      </div>
    </div>
  );
}
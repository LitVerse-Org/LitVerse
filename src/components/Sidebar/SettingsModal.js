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

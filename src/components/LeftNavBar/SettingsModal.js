import React from 'react';
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function SettingsModal({ show, onClose }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleCustomizeTheme = () => {
    console.log("Open Customize UI modal");
    onClose();
  };

  const handleLogout = () => {
    signOut();
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleRegistration = () => {
    router.push('/register');
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    onClose();
  };

  if (!show) return null;

  return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
        <div className="bg-darkGreen p-4 rounded-lg shadow-lg w-full max-w-md">
          <button onClick={onClose} className="float-right text-xl font-bold">&times;</button>
          <h2 className="text-xl font-bold text-center mb-4">Settings</h2>
          {!session ? (
              <div className="flex flex-col items-center space-y-3">
                <button onClick={handleSignIn} className="w-full py-2 px-4 border border-gray-300 rounded hover:bg-gray-100">Sign In</button>
                <button onClick={handleRegistration} className="w-full py-2 px-4 border border-gray-300 rounded hover:bg-gray-100">Register</button>
              </div>
          ) : (
              <div className="flex flex-col items-center space-y-3">
                <button onClick={handleCustomizeTheme} className="w-full py-2 px-4 border border-gray-300 rounded hover:bg-gray-100">Customize Theme</button>
                {/* Uncomment the next line to enable account deletion */}
                {/* <button onClick={handleDeleteAccount} className="w-full py-2 px-4 border border-gray-300 rounded hover:bg-gray-100">Delete Account</button> */}
                <button onClick={handleLogout} className="w-full py-2 px-4 border border-gray-300 rounded hover:bg-gray-100">Log Out</button>
              </div>
          )}
        </div>
      </div>
  );
}
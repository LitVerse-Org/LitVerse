import React from "react";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";

export default function Profile() {
    return (
        <div style={{
            display: "flex",
            height: "100vh",
            background: "white",
            margin: 0,
            padding: 0
        }}>
            <Sidebar />

            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                margin: 0,
                padding: 0
            }}>
                <ProfileHeader username="Your Username" postCount={5} />
                <div style={{
                    flex: 1,
                    background: "#ffffff",
                    color: "#000000"
                }}>
                    {/* Additional content goes here */}
                </div>
            </div>
        </div>
    );
}
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = existingUser.id;  // Replace with your method of getting the logged-in user's ID
                const response = await fetch(`/api/userOperations/getUser?userId=${userId}`);
                const data = await response.json();
                
                if (data.success) {
                    setUserData(data.user);
                } else {
                    setError(data.message);
                    console.error("Error fetching user data:", data.message);
                }
            } catch (error) {
                setError("Error fetching user data.");
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <div>Error loading profile: {error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>; // You can replace this with a proper loading indicator
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Profile Page</h1>
            <p>Welcome, {userData.username}!</p>
            <p>Email: {userData.email}</p>
            {/* Display other user data as needed */}
            {/* Add more profile-related content here */}
        </div>
    );
};

export default Profile;

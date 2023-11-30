import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function EditProfile() {
    const { data: session } = useSession();
    const router = useRouter();
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        bio: '',
    }); // Initialize with empty fields
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (session?.token?.sub) {
            setUserId(session.token.sub);
        }
        console.log('Session token in editProfeilePage.js:', userId);
    }, [session]);

    async function fetchUserProfile() {
        if (userId) {
            try {
                const response = await fetch(`/api/userOperations/getUser?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }
    }

    useEffect(() => {
        fetchUserProfile();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/userOperations/updateProfile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId, // Include userId in the request body
                    ...profileData
                }),
            });

            if (!response.ok) {
                if (response.headers.get("Content-Type")?.includes("application/json")) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to update profile');
                } else {
                    const errorText = await response.text();
                    throw new Error(errorText || 'Failed to update profile');
                }
            }

            const data = await response.json();
            console.log('Profile updated successfully', data);
            router.push('/profile'); // Redirect to the profile page
        } catch (error) {
            console.error('An error occurred while updating the profile:', error);
            setError(error.message || 'An error occurred');
        }
    };

    if (!session) {
        return <Layout>Loading...</Layout>;
    }

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <button onClick={() => router.push('/ViewProfile')} className="text-white">
                    ← Back
                </button>
                <h1 className="text-xl font-bold text-white mb-4">Edit Profile</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="text-white">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={profileData.username}
                            onChange={handleChange}
                            className="block w-full mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                            className="block w-full mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="bio" className="text-white">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={profileData.bio}
                            onChange={handleChange}
                            rows="4"
                            className="block w-full mt-1"
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                        Save Changes
                    </button>
                </form>
            </div>
        </Layout>
    );
}


import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function EditProfile() {
    const { data: session } = useSession();
    const router = useRouter();

    // State to store the profile form data
    const [profileData, setProfileData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        bio: '',
        password: '',
        newPassword: ''
    });

    // State to store any error messages
    const [error, setError] = useState('');

    // Fetch the profile data when the component mounts
    useEffect(() => {
        if (session?.user) {
            // Initialize the profile data with session data or placeholders
            setProfileData({
                username: session.user.name || '',
                firstName: 'John', // Placeholder: Replace with actual data
                lastName: 'Doe', // Placeholder: Replace with actual data
                email: session.user.email || '', // Placeholder: Replace with actual data
                bio: 'This is a bio' // Placeholder: Replace with actual data
            });
        }
    }, [session]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error messages

        try {
            const response = await fetch('/api/userOperations/updateProfile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any necessary headers such as an authentication token
                },
                body: JSON.stringify(profileData),
            });

            // Handle non-JSON response
            if (!response.ok) {
                if (response.headers.get("Content-Type")?.includes("application/json")) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to update profile');
                } else {
                    // Response is not JSON (e.g., server error page)
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
                    {/* Form fields for editing the profile */}
                    {/* ... existing form fields ... */}
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
<label htmlFor="firstName" className="text-white">First Name</label>
<input
    type="text"
    id="firstName"
    name="firstName"
    value={profileData.firstName}
    onChange={handleChange}
    className="block w-full mt-1"
/>
</div>
<div>
<label htmlFor="lastName" className="text-white">Last Name</label>
<input
    type="text"
    id="lastName"
    name="lastName"
    value={profileData.lastName}
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
<div>
<label htmlFor="password" className="text-white">Current Password</label>
<input
    type="password"
    id="password"
    name="password"
    value={profileData.password}
    onChange={handleChange}
    className="block w-full mt-1"
/>
</div>
<div>
<label htmlFor="newPassword" className="text-white">New Password</label>
<input
    type="password"
    id="newPassword"
    name="newPassword"
    value={profileData.newPassword}
    onChange={handleChange}
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


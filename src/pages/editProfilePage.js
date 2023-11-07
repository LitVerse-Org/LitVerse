import Layout from "../components/Layout";
import { useSession, getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function EditProfile() {
    const { data: session } = useSession();
    const router = useRouter();

    // State to store the profile form data
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        bio: '',
    });

    // Fetch the profile data when the component mounts
    useEffect(() => {
        if (session) {
            // Placeholder: Replace with your logic to fetch user profile
            setProfileData({
                name: 'John Doe', // Replace with data from session or fetch from API
                email: 'john@example.com', // Replace with data from session or fetch from API
                bio: 'This is a bio', // Replace with data from session or fetch from API
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
        // Placeholder: Replace with your logic to submit profile data to API
        console.log('Profile data submitted', profileData);
        // Redirect after submit
        router.push('/profile');
    };

    if (!session) {
        return <Layout>Loading...</Layout>;
    }

    return (
        <Layout>
            <div className="container mx-auto p-4">
                 {/* Back Arrow */}
                
                <button onClick={() => router.push('/ViewProfile')}>← Back</button>
                <h1 className="text-xl font-bold text-white mb-4">Edit Profile</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="text-white">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={profileData.name}
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
                    <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Save Changes</button>
                </form>
            </div>
        </Layout>
    );
}

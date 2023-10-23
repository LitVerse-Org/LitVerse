// components/ViewProfile.js
import React, {useEffect, useState} from 'react';

async function fetchUserProfile(userId) {
    const res = await fetch(`/api/userOperations/getUser?userId=${userId}`);
    return await res.json();
}

export default function ViewProfile({ userId }) {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        fetchUserProfile(userId)
            .then(data => setProfileData(data))
            .catch(err => console.error("Error fetching profile:", err));
    }, [userId]);

    return (
        <div className="container mx-auto my-12 p-6 bg-white rounded shadow">
            {profileData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <img className="rounded" src={profileData.profileImgS3URL} alt="Profile" />
                    </div>
                    <div className="space-y-4 text-black">
                        <h1 className="text-2xl font-bold">{profileData.username}</h1>
                        <p>Email: {profileData.email}</p>
                        <p>Phone: {profileData.phone || 'N/A'}</p>
                        <p>Bio: {profileData.bio || 'N/A'}</p>
                        <p>Comments: {profileData.comments || 'N/A'}</p>
                        {/* ...other user fields */}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

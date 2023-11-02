import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


// The Profile component is now prepared to receive a 'userId' prop for dynamically requesting user data.
export default function Profile({ userId }) {
  // State hook for storing profile data.
  const [profileData, setProfileData] = useState(null);
  const router = useRouter(); // Declare it here

  // Asynchronous function to fetch user profile data.
  async function fetchUserProfile() {
    try {
      const response = await fetch(`/api/userOperations/getUser?userId=${userId}`);
      const data = await response.json();
      setProfileData(data); // Set the profile data in the state.
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  // useEffect hook to perform side effects (data fetching in this case).
  useEffect(() => {
    fetchUserProfile(); // Fetch user profile data when the component is mounted.
  }, [userId]); // The dependency array with 'userId' means the effect will rerun if 'userId' changes.

  // Below is the JSX that makes up the component presentation.
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Conditional rendering for the UI elements depending on whether 'profileData' is available. */}
      {profileData ? (
        <>
          {/* Navigation Bar */}
          <div className="flex justify-start items-center bg-gray-800 px-6 py-4 space-x-4">
            <button onClick={() => router.push('/home')}>←</button>
            <div className="text-left">
              {/* Dynamic data is inserted here */}
              <h2 className="text-lg font-bold">{profileData.name}</h2>
              <p className="text-sm">{profileData.postsCount} posts</p>
            </div>
          </div>

          {/* Gray Profile Section */}
          <div className="mt-6 mx-6 px-6 py-8 rounded-lg relative bg-gray-700" style={{ height: '250px' }}>
            {/* Avatar Circle */}
            <div className="absolute bottom-0 left-3 w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center">
              {/* First letter of the dynamic name is used here */}
              {/* Using optional chaining to safely access 'name'.*/}
                <span className="text-3xl font-bold">{profileData?.name?.charAt(0)}</span>

            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col mt-4 ml-6 mr-6">
            <h1 className="text-2xl font-bold">{profileData.name}</h1>
            <p className="text-sm mt-2">@{profileData.username}</p>
            <p className="text-xs mt-2">Joined {profileData.joinDate}</p>
            <div className="flex mt-2">
              <p className="text-xs mr-4">{profileData.followingCount} Following</p>
              <p className="text-xs">{profileData.followersCount} Followers</p>
            </div>

            {/* Edit Profile Button */}
            <button className="bg-gray-800 px-4 py-2 rounded mt-4 self-end">Edit Profile</button>

            {/* Posts and Likes */}
            <div className="text-center pt-4">
              <span className="text-xl underline mb-4 block">My Stuff</span>
              <div className="flex mt-6 pl-1 space-x-4 justify-center">
                <a href="#" className="text-sm border-b-2 border-transparent hover:border-white">Posts</a>
                <a href="#" className="text-sm border-b-2 border-transparent hover:border-white">Likes</a>
                <a href="#" className="text-sm border-b-2 border-transparent hover:border-white">Comments</a>
                <a href="#" className="text-sm border-b-2 border-transparent hover:border-white">Bookmarks</a>
                <a href="#" className="text-sm border-b-2 border-transparent hover:border-white">Followers</a>
                <a href="#" className="text-sm border-b-2 border-transparent hover:border-white">Following</a>
                <a href="#" className="text-sm border-b-2 border-transparent hover:border-white">Communities</a>
                <a href="#" className="text-sm border-b-2 border-transparent hover:border-white">Challenges</a>
              </div>
            </div>

          </div>
        </>
      ) : (
        <p>Loading...</p> // Placeholder text for when the data is being fetched.
      )}
    </div>
  );
}

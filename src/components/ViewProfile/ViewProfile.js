import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Profile({ userId }) {
  const [profileData, setProfileData] = useState(null);
  const router = useRouter();

  async function fetchUserProfile() {
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

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  // Helper function to navigate
  const navigate = (path) => () => {
    router.push(path);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {profileData ? (
        <>
          <div className="flex justify-start items-center bg-gray-800 px-6 py-4 space-x-4">
            <button onClick={() => router.push('/home')}>← Back</button>
            <div className="text-left">
              <h2 className="text-lg font-bold">{profileData.name}</h2>
              
            </div>
            {/* Display the username and number of posts */}
          <div className="text-left ml-6 mt-6">
            <h2 className="text-lg font-bold">@{profileData.username}</h2>
            <p className="text-sm">{profileData.postsCount || 0} posts</p>
          </div>
          </div>

          <div className="mt-6 mx-6 px-6 py-8 rounded-lg relative bg-gray-700" style={{ height: '250px' }}>
            <img
              src="/avatar.jpg"
              alt={`${profileData.name || ''}'s avatar`}
              className="absolute bottom-0 left-3 w-24 h-24 rounded-full object-cover"
            />
          </div>

          <div className="flex flex-col mt-4 ml-6 mr-6">
          <button
          className="bg-gray-800 px-4 py-2 rounded mt-2 self-end"
          onClick={() => router.push('/editProfilePage')}
            >
            Edit Profile
              </button>
            <h1 className="text-2xl font-bold">{profileData.name}</h1>
            <p className="text-sm mt-1">@{profileData.username}</p>
            <p className="text-xs mt-2">Joined {profileData.joinDate}</p>
            <p className="text-xs mt-2">Email: {profileData.email}</p>
            <div className="flex mt-2 mb-1">
              <p className="text-xs mr-4">{profileData.followingCount} Following</p>
              <p className="text-xs">{profileData.followersCount} Followers</p>
            </div>
          </div>

          <div className="text-center mt-1 ml-6 mr-6">
            <div className="border-b border-white">
              <div className="flex mt-6 pl-1 space-x-4 justify-center">
                <div onClick={navigate('/posts')} className="text-sm border-b-2 border-transparent hover:border-white cursor-pointer">Posts</div>
                <div onClick={navigate('/likes')} className="text-sm border-b-2 border-transparent hover:border-white cursor-pointer">Likes</div>
                <div onClick={navigate('/comments')} className="text-sm border-b-2 border-transparent hover:border-white cursor-pointer">Comments</div>
                <div onClick={navigate('/bookmarks')} className="text-sm border-b-2 border-transparent hover:border-white cursor-pointer">Bookmarks</div>
                <div onClick={navigate('/followers')} className="text-sm border-b-2 border-transparent hover:border-white cursor-pointer">Followers</div>
                <div onClick={navigate('/following')} className="text-sm border-b-2 border-transparent hover:border-white cursor-pointer">Following</div>
                <div onClick={navigate('/communities')} className="text-sm border-b-2 border-transparent hover:border-white cursor-pointer">Communities</div>
                <div onClick={navigate('/challenges')} className="text-sm border-b-2 border-transparent hover:border-white cursor-pointer">Challenges</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import DisplayBookmarkedPosts from "@/components/ViewPost/DisplayBookmarkedPosts";
import DisplayUserPosts from "@/components/ViewPost/DisplayUserPosts";
import DisplayLikedPosts from "@/components/ViewPost/DisplayLikedPosts";
import DisplayFollowers from "@/components/ViewFollowers-Following/DisplayFollowers";
import DisplayFollowing from "@/components/ViewFollowers-Following/DisplayFollowing";
import { useRouter } from 'next/router';
import {router} from "next/client";


export default function Profile({ userId }) {
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState('posts'); // Default to 'posts'

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
  

  // Update tab change logic
  const changeTab = (tab) => () => {
    setActiveTab(tab);
  };

  // Tab content renderer based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return <DisplayUserPosts userId={userId} />;
      case 'likes':
        return <DisplayLikedPosts userId={userId} />;
      case 'bookmarks':
        return <DisplayBookmarkedPosts userId={userId} />;
      case 'followers':
        return <DisplayFollowers userId={userId} />;
      case 'following':
        return <DisplayFollowing userId={userId} />;
      default:
        return <div>You don't have any content here yet!</div>;
    }
  };

  // Helper function to navigate
  const navigate = (path) => () => {
    router.push(path);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {profileData ? (
          <>
            <div className="flex justify-start items-center bg-gray-800 px-6 py-4 space-x-4">
              {/* Profile header and other content */}
              <div className="text-left">
                <h2 className="text-lg font-bold">{profileData.name}</h2>
              </div>
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
            </div>

            {/* Tabs */}
            <div className="text-center mt-1 ml-6 mr-6">
              <div className="border-b border-white">
                <div className="flex mt-6 pl-1 space-x-4 justify-center">
                  {/* Tab buttons */}
                  <div onClick={changeTab('posts')} className="text-sm border-b-2 border-transparent hover:border-white cursor-pointer">Posts</div>
                  <div onClick={changeTab('likes')} className="text-sm border-b-2 border-transparent hover:border-white cursor-pointer">Likes</div>
                  <div onClick={changeTab('bookmarks')} className="text-sm border-b-2 border-transparent hover:border-white cursor-pointer">Bookmarks</div>
                  <div onClick={changeTab('followers')} className="text-sm border-b-2 border-transparent hover:border-white cursor-pointer">Followers</div>
                  <div onClick={changeTab('following')} className="text-sm border-b-2 border-transparent hover:border-white cursor-pointer">Following</div>
                         </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
              {renderTabContent()}
            </div>
          </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

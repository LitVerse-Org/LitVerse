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
            <div className="flex justify-start items-center bg-black px-6 py-4 space-x-4">
              {/* Profile header and other content */}
              <div className="relative bg-gray-700" style={{ height: '250px', width: '100%' }}>
                {/* Banner Image */}
                <img
                    src="/spacebanner.png"
                    alt="Banner"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />

                {/* Avatar */}
                <img
                    src="/profilepic.png"
                    alt={`${profileData.name || ''}'s avatar`}
                    className="absolute bottom-0 bg-none left-3 w-32 h-32 rounded object-cover"
                />

                {/* Username and Post Count */}
                <div className="absolute top-3 left-3 bg-black bg-opacity-50 rounded px-3 py-2">
                  <h2 className="text-lg font-bold">@{profileData.username}</h2>
                  <p className="text-sm">{profileData.postsCount || 0} posts</p>
                </div>
              </div>
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
              <p className="text-xs mt-2">Email: {profileData.email}</p>
            </div>

            {/* Tabs */}
            <div className="text-center mt-1 ml-6 mr-6">
              <div>
                <div className="flex mt-6 pl-1 gap-2 justify-center">
                  {/* Tab buttons */}
                  <div onClick={changeTab('posts')} className="text-sm border-b-2 border-transparent hover:bg-gray-300 hover:text-green-800 cursor-pointer">My Posts</div>
                  <div onClick={changeTab('likes')} className="text-sm border-b-2 border-transparent hover:bg-gray-300 hover:text-green-800 cursor-pointer">My Likes</div>
                  <div onClick={changeTab('bookmarks')} className="text-sm border-b-2 border-transparent hover:bg-gray-300 hover:text-green-800 cursor-pointer">My Bookmarks</div>
                  <div onClick={changeTab('followers')} className="text-sm border-b-2 border-transparent hover:bg-gray-300 hover:text-green-800 cursor-pointer">Followers</div>
                  <div onClick={changeTab('following')} className="text-sm border-b-2 border-transparent hover:bg-gray-300 hover:text-green-800 cursor-pointer">Following</div>
                </div>
                <div className="underline bg-gray-400 rounded-full mt-2 pt-2"/>
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

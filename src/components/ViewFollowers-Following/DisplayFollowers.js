import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Avatar from './Avatar';

const DisplayFollowers = () => {
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getFollowers'); // Adjust API endpoint as needed
        setFollowers(response.data);
      } catch (error) {
        console.error('Error fetching followers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Your Followers</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {followers.map((follower) => (
            <div key={follower.id} className="flex items-center my-2">
              {/*<Avatar src={follower.profileImgS3URL} big={false} editable={false} />*/}
              <div className="ml-4">
                <h2 className="text-xl">{follower.username}</h2>
                <p className="text-gray-500">{follower.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayFollowers;


/*
how this should look when all is said and done (we can remove the email stuff, just wanted it for testing)

Your DisplayFollowers

(👤 Avatar) Username 1
username1@email.com

(👤 Avatar) Username 2
username2@email.com

(👤 Avatar) Username 3
username3@email.com
*/ 
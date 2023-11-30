import React, { useEffect, useState } from 'react';
import DisplayPost from './DisplayPost';

const DisplayLikedPosts = ({ userId }) => {
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await fetch(`/api/userOperations/getUserPosts?userId=${userId}`);
                if (response.ok) {
                    const posts = await response.json();
                    setUserPosts(posts);
                } else {
                    console.error('Failed to fetch user`s posts');
                }
            } catch (error) {
                console.error('Error fetching this user`s posts posts:', error);
            }
        };

        if (userId) {
            fetchUserPosts();
        }
    }, [userId]);

    return (
        <div>
            {userPosts.map(post => (
                <DisplayPost key={post.id} post={post} />
            ))}
        </div>
    );
};

export default DisplayLikedPosts;

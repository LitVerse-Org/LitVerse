import React, { useEffect, useState } from 'react';
import DisplayPost from './DisplayPost';

const DisplayLikedPosts = ({ userId }) => {
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        const fetchLikedPosts = async () => {
            try {
                const response = await fetch(`/api/userOperations/getLikedPosts?userId=${userId}`);
                if (response.ok) {
                    const posts = await response.json();
                    setLikedPosts(posts);
                } else {
                    console.error('Failed to fetch liked posts');
                }
            } catch (error) {
                console.error('Error fetching liked posts:', error);
            }
        };

        if (userId) {
            fetchLikedPosts();
        }
    }, [userId]);

    return (
        <div>
            {likedPosts.map(post => (
                <DisplayPost key={post.id} post={post} />
            ))}
        </div>
    );
};

export default DisplayLikedPosts;

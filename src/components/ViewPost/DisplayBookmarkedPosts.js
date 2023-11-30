import React, { useEffect, useState } from 'react';
import DisplayPost from './DisplayPost';

const DisplayBookmarkedPosts = ({ userId }) => {
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

    useEffect(() => {
        const fetchBookmarkedPosts = async () => {
            try {
                const response = await fetch(`/api/userOperations/getBookmarkedPosts?userId=${userId}`);
                if (response.ok) {
                    const posts = await response.json();
                    setBookmarkedPosts(posts);
                } else {
                    console.error('Failed to fetch bookmarked posts');
                }
            } catch (error) {
                console.error('Error fetching bookmarked posts:', error);
            }
        };

        if (userId) {
            fetchBookmarkedPosts();
        }
    }, [userId]);

    return (
        <div>
            {bookmarkedPosts.map(post => (
                <DisplayPost key={post.id} post={post} />
            ))}
        </div>
    );
};

export default DisplayBookmarkedPosts;

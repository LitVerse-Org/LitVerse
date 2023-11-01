import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactMarkdown from 'react-markdown';
import { faThumbsUp, faComment, faBookmark } from '@fortawesome/free-solid-svg-icons';

const DisplayPost = ({ post, userID }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        fetchLikesCount();
    }, [post.id]);

    const fetchLikesCount = async () => {
        try {
            const response = await fetch(`/api/postOperations/getLikesForPost?postId=${post.id}`);
            const usersWhoLiked = await response.json();
            setLikesCount(usersWhoLiked.length);
        } catch (error) {
            console.error('Error fetching likes count:', error);
        }
    };

    const handleLike = async () => {
        setIsLiked(!isLiked);
        const requestBody = JSON.stringify({ userID, postId: post.id });
        try {
            const response = await fetch('/api/postOperations/likePost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error liking the post:', errorData.error);
                return; // Exit the function
            }

            if (isLiked) {
                setLikesCount(likesCount - 1);
            } else {
                setLikesCount(likesCount + 1);
            }

            // Refetch likes count after liking/unliking
            fetchLikesCount();
        } catch (error) {
            console.error('Network or fetch error:', error);
        }
    };


    const handleBookmark = async () => {
        setIsBookmarked(!isBookmarked);
        if (isBookmarked) {
            await fetch('/api/postOperations/unbookmarkPost', {
                method: 'POST',
                body: JSON.stringify({ postId: post.id })
            });
        } else {
            await fetch('/api/postOperations/bookmarkPost', {
                method: 'POST',
                body: JSON.stringify({ postId: post.id })
            });
        }
    };

    const formatDate = (dateString) => {
        const postDate = new Date(dateString);
        const currentDate = new Date();
        const diffInHours = (currentDate - postDate) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return `${Math.floor(diffInHours)} hr ago`;
        }

        return postDate.toLocaleDateString();
    };

    const formattedDate = formatDate(post.createdAt);

    return (
        <div className="border border-white bg-black p-4 rounded-lg w-full mb-4">
            <div className="flex justify-between items-center">
                <div className="font-bold text-white">{post.user.username}</div>
                <div className="text-sm text-white">{formattedDate}</div>
            </div>
            <div className="mt-2 text-white">
                <ReactMarkdown>{`${post.content}`}</ReactMarkdown>
            </div>
            <div className="flex mt-2">
                <button onClick={handleLike} className={`text-white w-1/3 ${isLiked ? 'text-blue-400' : ''}`}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span className="ml-2">{likesCount}</span> {/* Display the likes count */}
                </button>
                <button className="text-white w-1/3">
                    <FontAwesomeIcon icon={faComment} />
                </button>
                <button onClick={handleBookmark} className={`text-white w-1/3 ${isBookmarked ? 'text-yellow-400' : ''}`}>
                    <FontAwesomeIcon icon={faBookmark} />
                </button>
            </div>
        </div>
    );
};

export default DisplayPost;

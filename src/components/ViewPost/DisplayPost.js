import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactMarkdown from 'react-markdown';
import { faThumbsUp, faComment, faBookmark } from '@fortawesome/free-solid-svg-icons';

const DisplayPost = ({ post }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleLike = async () => {
        setIsLiked(!isLiked);
        if (isLiked) {
            await fetch('/api/postOperations/unlikePost', {
                method: 'POST',
                body: JSON.stringify({ postId: post.id })
            });
        } else {
            await fetch('/api/postOperations/likePost', {
                method: 'POST',
                body: JSON.stringify({ postId: post.id })
            });
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

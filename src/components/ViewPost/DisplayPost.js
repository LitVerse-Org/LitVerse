import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactMarkdown from 'react-markdown';
import { faThumbsUp, faComment, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useUserId } from '/utilities/useUserID';

const DisplayPost = ({ post }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const userID = useUserId();

    useEffect(() => {
        fetchLikesCount();
        fetchBookmarkStatus();
    }, [post.id, userID]);

    const fetchLikesCount = async () => {
        try {
            const response = await fetch(`/api/postOperations/getLikesForPost?postId=${post.id}`);
            const usersWhoLiked = await response.json();
            setLikesCount(usersWhoLiked.length);
            setIsLiked(usersWhoLiked.some(user => user.id === userID));
        } catch (error) {
            console.error('Error fetching likes count:', error);
        }
    };

    const fetchBookmarkStatus = async () => {
        try {
            const response = await fetch(`/api/postOperations/getBookmarkStatus?postId=${post.id}&userId=${userID}`);
            const bookmarkStatus = await response.json();
            setIsBookmarked(bookmarkStatus.isBookmarked);
        } catch (error) {
            console.error('Error fetching bookmark status:', error);
        }
    };

    const handleLike = async () => {
        setIsLiked(true);
        setLikesCount(prev => prev + 1);

        try {
            const response = await fetch('/api/postOperations/likePost', {
                method: 'POST',
                body: JSON.stringify({ userId: userID, postId: post.id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Response from server not ok');
            }

        } catch (error) {
            console.error('Error liking the post:', error);
            setIsLiked(false);
            setLikesCount(prev => prev - 1);
        }
    };

    const handleUnlike = async () => {
        setIsLiked(false);
        setLikesCount(prev => prev - 1);

        try {
            const response = await fetch('/api/postOperations/unlikePost', {
                method: 'POST',
                body: JSON.stringify({ userId: userID, postId: post.id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Response from server not ok');
            }

        } catch (error) {
            console.error('Error unliking the post:', error);
            setIsLiked(true);
            setLikesCount(prev => prev + 1);
        }
    };

    const handleBookmark = async () => {
        const bookmarkedState = !isBookmarked;
        setIsBookmarked(bookmarkedState);

        const endpoint = bookmarkedState ? '/api/postOperations/bookmarkPost' : '/api/postOperations/unbookmarkPost';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify({ userId: userID, postId: post.id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Response from server not ok');
            }
        } catch (error) {
            console.error('Error bookmarking/unbookmarking the post:', error);
            setIsBookmarked(!bookmarkedState);
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
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
            <div className="flex mt-2">
                <button onClick={isLiked ? handleUnlike : handleLike} className={`text-white w-1/3 ${isLiked ? 'text-blue-400' : ''}`}>
                    <FontAwesomeIcon icon={faThumbsUp} /> {likesCount}
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

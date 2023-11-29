import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactMarkdown from 'react-markdown';
import Markdown from 'react-markdown';
import {faThumbsUp, faComment, faBookmark, faCheck} from '@fortawesome/free-solid-svg-icons';
import { useUserId } from '/utilities/useUserID';

const DisplayPost = ({ post }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false); // State to track follow status
    const userID = useUserId();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        fetchLikesCount();
        fetchBookmarkStatus();
        checkFollowStatus();
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

    const checkFollowStatus = async () => {
        try {
            const response = await fetch(`/api/followOperations/isFollowing?userId=${post.userId}&followerId=${userID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch follow status');
            }
            const { isFollowing } = await response.json();
            setIsFollowing(isFollowing);
        } catch (error) {
            console.error('Error checking follow status:', error);
        }
    };
    const handleFollow = async () => {
        try {
            const response = await fetch('/api/followOperations/followUser', {
                method: 'POST',
                body: JSON.stringify({ followerId: userID, userId: post.userId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setIsFollowing(true);
            } else {
                throw new Error('Response from server not ok');
            }
        } catch (error) {
            console.error('Error following the user:', error);
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

    const Modal = ({ onClose, children }) => {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg max-w-xl w-full">
                    <button onClick={onClose} className="float-right font-bold">X</button>
                    {children}
                </div>
            </div>
        );
    };


    const formattedDate = formatDate(post.createdAt);

    return (
        <div className="border border-white bg-black p-4 rounded-lg w-full mb-4">
            <div className="flex justify-between items-center">
                <div className="flex flex-row items-center">
                    <div className="font-bold text-white">{post.user.username}</div>
                    {isFollowing ? (
                        <FontAwesomeIcon icon={faCheck} className="ml-2 text-green-500" />
                    ) : (
                        <button onClick={handleFollow} className="ml-2 text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-1 rounded">
                            Follow +
                        </button>
                    )}
                </div>
                <div className="text-sm text-white">{formattedDate}</div>
            </div>
            <div className="mt-2 text-white" style={{
                display: '-webkit-box',
                WebkitLineClamp: '5', // Number of lines to show before truncating
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxHeight: '250px' // Adjust this value based on your design needs
            }}>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            <div className="flex justify-between items-center mt-2">
                <div className="flex justify-center items-center">
                    <button onClick={isLiked ? handleUnlike : handleLike} className={`text-white ${isLiked ? 'text-blue-400' : ''}`}>
                        <FontAwesomeIcon icon={faThumbsUp} /> {likesCount}
                    </button>
                    <button className="text-white mx-4">
                        <FontAwesomeIcon icon={faComment} />
                    </button>
                    <button onClick={handleBookmark} className={`text-white ${isBookmarked ? 'text-yellow-400' : ''}`}>
                        <FontAwesomeIcon icon={faBookmark} />
                    </button>
                </div>
                <button onClick={toggleModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                    View Full Post
                </button>
            </div>

            {/* Modal for displaying full post */}
            {isModalOpen && (
                <Modal onClose={toggleModal}>
                    <div className="border border-white bg-black p-4 rounded-lg w-full" style={{ maxWidth: '90vw', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div className="flex justify-between items-center">
                            <div className="font-bold text-white flex items-center">
                                {post.user.username}
                                {isFollowing ? (
                                    <FontAwesomeIcon icon={faCheck} className="ml-2 text-green-500" />
                                ) : (
                                    <button onClick={handleFollow} className="ml-2 text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-1 rounded">
                                        Follow +
                                    </button>
                                )}                            </div>
                            <div className="text-sm text-white">{formatDate(post.createdAt)}</div>
                        </div>
                        <div className="underline bg-white h-1 rounded-full"/>
                        <div className="mt-2 text-white">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                        </div>
                        <div className="flex justify-center items-center mt-2">
                            <button onClick={isLiked ? handleUnlike : handleLike} className={`text-white ${isLiked ? 'text-blue-400' : ''}`}>
                                <FontAwesomeIcon icon={faThumbsUp} /> {likesCount}
                            </button>
                            <button className="text-white mx-4">
                                <FontAwesomeIcon icon={faComment} />
                            </button>
                            <button onClick={handleBookmark} className={`text-white ${isBookmarked ? 'text-yellow-400' : ''}`}>
                                <FontAwesomeIcon icon={faBookmark} />
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default DisplayPost;

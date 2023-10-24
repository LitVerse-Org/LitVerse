import React, { useEffect, useState, useRef } from 'react';
import { getSession, useSession, signOut } from 'next-auth/react';
import Layout from '../components/Layout';

export default function Home() {
    const {data: session, status} = useSession();
    const [randomUsers, setRandomUsers] = useState([]);
    const [showSessionInfo, setShowSessionInfo] = useState(false);
    const sessionInfoRef = useRef(null);

    const handleLogout = async () => {
        await signOut();
    };

    const toggleSessionInfo = () => {
        setShowSessionInfo(!showSessionInfo);
    };

    useEffect(() => {
        // Fetch 5 random usernames and their posts
        fetch('/api/userOperations/getRandomUsersandPosts?count=2')
            .then((res) => res.json())
            .then((data) => {
                setRandomUsers(data);
            })
            .catch((error) => console.error('Error fetching random users:', error));
    }, []);

    return (
        <Layout>
            <div style={{textAlign: 'center'}}>
                <button onClick={toggleSessionInfo} style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    margin: '10px'
                }}>
                    Show Session Info
                </button>
                {showSessionInfo && <div ref={sessionInfoRef}
                                         style={{backgroundColor: '#f1f1f1', padding: '10px', borderRadius: '5px'}}>
                    <p style={{color: 'black'}}>Signed in as {JSON.stringify(session)}</p>
                </div>}
                <button onClick={handleLogout}
                        className="px-3 py-2 sm:px-4 sm:py-2 flex font-roboto-slab text-zinc-200 font-bold bg-darkGreen focus:bg-black rounded-full">Logout
                </button>

                {/* Display Random Usernames and their Posts */}
                <h2 style={{color: 'white'}}>Random User Posts</h2>
                {randomUsers.map((user, index) => (
                    <div key={index}
                         style={{border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px'}}>
                        <h3 style={{color: 'white'}}>{user.username}</h3>
                        <ul style={{color: 'white'}}>
                            {user.posts.map((post, postIndex) => (
                                <li key={postIndex} style={{
                                    marginBottom: '10px',
                                    padding: '5px',
                                    borderRadius: '3px',
                                    backgroundColor: '#333'
                                }}>
                                    {post.content}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
import React, { useEffect, useState, useRef } from 'react';
import { getSession, useSession, signOut } from 'next-auth/react';
import Layout from '../components/Layout';
import TextEditor from "@/components/CreatePost/TextEditor";
import DisplayPost from '../components/ViewPost/DisplayPost';  // Make sure to adjust the import path

export default function Home() {
    const { data: session, status } = useSession();
    const [randomPosts, setRandomPosts] = useState([]);
    const [showSessionInfo, setShowSessionInfo] = useState(false);
    const sessionInfoRef = useRef(null);

    const toggleSessionInfo = () => {
        setShowSessionInfo(!showSessionInfo);
    };

    useEffect(() => {
        // Fetch 10 random posts
        fetch('/api/userOperations/getTenRandomPosts?count=10')
            .then((res) => res.json())
            .then((data) => {
                console.log('Received data:', data);  // Debug line
                if (Array.isArray(data)) {
                    setRandomPosts(data);
                } else {
                    console.error('Data is not an array:', data);
                }
            })
            .catch((error) => console.error('Error fetching random posts:', error));
    }, []);


    return (
        <Layout>
            <div className="text-center">
                <div>
                    <TextEditor />
                </div>
                <h1 className="text-white text-3xl pt-12 pb-8">Home Feed</h1>
                {randomPosts.map((post, index) => (
                    <DisplayPost key={index} post={post} />
                ))}
            </div>
        </Layout>
    );
}

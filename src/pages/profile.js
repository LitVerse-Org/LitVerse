import React, { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import Sidebar from '../components/Sidebar';
import ViewProfile from '../components/profilecomponents/ViewProfile';

export default function Profile() {
    const { data: session } = useSession();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (session?.token?.sub) {
            setUserId(session.token.sub);
        }
    }, [session]);

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            background: 'black',
            margin: 0,
            padding: 0
        }}>
            <Sidebar className='bg-black'/>
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                margin: 0,
                padding: 0
            }}>
                <div style={{
                    flex: 1,
                    background: 'black',
                    color: '#000000'
                }}>
                    {/* Add more profile-related content here */}
                </div>
                <div className="container mx-auto px-4">
                    {userId && <ViewProfile userId={userId} />}
                </div>
            </div>
        </div>
    );
}

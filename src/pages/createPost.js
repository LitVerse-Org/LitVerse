import React, {useEffect, useState} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import TextEditor from '@/components/CreatePost/TextEditor';
import handlePostClick from '@/components/CreatePost/TextEditor';

export default function CreatePost() {
	const { data: session } = useSession();
	const router = useRouter();
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		if (session?.token?.sub) {
			setUserId(session.token.sub);
		}
		console.log('Session token in profile.js:', userId);
	}, [session]);

	useEffect(() => {
		if (!session) {
			router.push('/login');
		}
	}, [session, router]);

	return (
		<div style={{ backgroundColor: 'white', color: 'black', height: '100vh', padding: '20px' }}>
			<h1>Create a Post</h1>
			{session ? (
				<TextEditor userId={userId}/>
			) : (
				<p>Loading...</p> // This will be shown briefly before the user is redirected
			)}
		</div>
	);
}

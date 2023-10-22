import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import TextEditor from '../components/createPostComponents/TextEditor';
import handlePostClick from '../components/createPostComponents/TextEditor';

export default function CreatePost() {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!session) {
			router.push('/login');
		}
	}, [session, router]);

	return (
		<div style={{ backgroundColor: 'white', color: 'black', height: '100vh', padding: '20px' }}>
			<h1>Create a Post</h1>
			{session ? (
				<TextEditor />
			) : (
				<p>Loading...</p> // This will be shown briefly before the user is redirected
			)}
		</div>
	);
}

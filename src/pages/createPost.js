import React, {useEffect, useState} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import TextEditorMain from '@/components/CreatePost/TextEditorMain';
import handlePostClick from '@/components/CreatePost/TextEditor';
import Layoutmini from '@/components/Layoutmini';

export default function CreatePost() {
	const { data: session } = useSession();
	const router = useRouter();
	const [userId, setUserId] = useState(null);


	useEffect(() => {
		if (!session) {
			router.push('/login');
		}
	}, [session, router]);


	useEffect(() => {
		if (session?.token?.sub) {
			setUserId(session.token.sub);
		}
		console.log('Session token in bookmarks.js:', userId);
	}, [session]);

	return (
		<Layoutmini>
		<div style={{ backgroundColor: 'black', color: 'white', height: '100vh', padding: '20px' }}>
			<h1>Create a Post</h1>
			{session ? (
				<TextEditorMain userId={userId}/>
			) : (
				<p>Loading...</p> // This will be shown briefly before the user is redirected
			)}
		</div>
		</Layoutmini>
	);
}

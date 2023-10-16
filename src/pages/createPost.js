import React from 'react';
import TextEditor from '../components/createPostComponents/TextEditor';
import handlePostClick from '../components/createPostComponents/TextEditor'

export default function CreatePost() {
	// Replace this with your actual user authentication check
	const isUserSignedIn = true;

	return (
		<div style={{ backgroundColor: 'white', color: 'black', height: '100vh', padding: '20px' }}>
			<h1>Create a Post</h1>
			{isUserSignedIn ? (
				<TextEditor />
			) : (
				<p>You must be signed in to create a post.</p>
			)}
		</div>
	);
}

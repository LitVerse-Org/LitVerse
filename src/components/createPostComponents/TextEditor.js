import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// import TagSelector from './TagSelector'; // Import the TagSelector component (commented out)
import 'quill/dist/quill.snow.css';  // Import styles

const QuillNoSSRWrapper = dynamic(
	() => import('react-quill'),
	{ ssr: false }
);

const TextEditor = () => {
	const [editorContent, setEditorContent] = useState('');
	// const [selectedTags, setSelectedTags] = useState([]);  // State to hold the selected tags (commented out)

	const handleChange = (content, delta, source, editor) => {
		const html = editor.getHTML();
		setEditorContent(html);
	};

	const handlePostClick = async () => {
		const response = await fetch('/api/postOperations/createPost', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ content: editorContent }),  // Include tags (commented out)
		});

		if (response.ok) {
			console.log('Post created successfully');
		}
	};

	return (
		<div style={{ backgroundColor: '#F5F5F5', padding: '10px' }}>
			<div style={{ height: '100px', marginBottom: '20px' }}>
				<QuillNoSSRWrapper
					placeholder="Write a short story..."
					theme="snow"

					modules={{
						toolbar: [
							[{ 'header': '1'}, { 'font': [] }],
							[{ 'list': 'ordered'}, { 'list': 'bullet' }],
							['bold', 'italic', 'underline'],
							['image', 'code-block']
						]
					}}
					onChange={handleChange}
				/>
			</div>
			<input
				type="text"
				placeholder="Add tags..."
				>
			</input>
			{/* <TagSelector onSelectTags={setSelectedTags} /> Include the TagSelector component (commented out) */}
			<button
				style={{ backgroundColor: 'green', color: 'white', padding: '10px', marginTop: '10px', justifyContent: 'center' }}
				onClick={handlePostClick}
			>
				Post
			</button>
		</div>
	);
};

export default TextEditor;

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(
	() => import('react-quill'),
	{ ssr: false }
);

const TextEditor = () => {
	const [editorContent, setEditorContent] = useState('');

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
			body: JSON.stringify({ content: editorContent }),
		});

		if (response.ok) {
			console.log('Post created successfully');
		}
	};

	return (
		<div className="bg-gray-100 p-5 rounded-lg">
			<div className="h-50 mb-5">
				<QuillNoSSRWrapper
					placeholder="Once upon a time..."
					theme="snow"
					modules={{
						toolbar: [
							[{ 'header': '1'}, { 'font': [] }],
							[{ 'list': 'ordered'}, { 'list': 'bullet' }],
							['bold', 'italic', 'underline'],
							['image', 'code-block']
						]
					}}
					className="h-25"
					onChange={handleChange}
				/>
			</div>

			<div className="flex justify-end mt-4">
				<input
					type="text"
					className="rounded-lg border p-1 w-1/5"
					placeholder="Add tags..."
				/>
				<button
					className="px-3 py-2 sm:px-4 sm:py-2 flex font-roboto-slab text-white font-bold bg-green-600 focus:bg-green-800 rounded-full"
					onClick={handlePostClick}
				>
					Post
				</button>
			</div>
		</div>
	);
};

export default TextEditor;

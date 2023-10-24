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
        <div style={{ backgroundColor: '#F5F5F5', padding: '10px', borderRadius: '15px' }}>
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
                className=""
                style={{borderRadius: '10px'}}
                placeholder="Add tags..."
                >
            </input>
    
            {/* <TagSelector onSelectTags={setSelectedTags} /> Include the TagSelector component (commented out) */}
            <div className="flex justify-end">
                <button
                    className="px-3 py-2 sm:px-4 sm:py-2 flex font-roboto-slab text-zinc-200 font-bold bg-darkGreen focus:bg-black rounded-full"
                    onClick={handlePostClick}
                >
                    Post
                </button>
            </div>
        </div>
    );
};


export default TextEditor;

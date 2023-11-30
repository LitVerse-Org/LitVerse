import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(
    () => import('react-quill'),
    { ssr: false }
);

const TextEditor = ({ userId }) => {
    const [editorContent, setEditorContent] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        // Fetch tags when component mounts
        const fetchTags = async () => {
            const response = await fetch('/api/tagOperations/getTags');
            if (response.ok) {
                const data = await response.json();
                setTags(data);
            }
        };

        fetchTags();
    }, []);

    const handleChange = (content, delta, source, editor) => {
        const html = editor.getHTML();
        setEditorContent(html);
    };

    const handleTagInputChange = (e) => {
        const inputValue = e.target.value;
        setTagInput(inputValue);
        if (inputValue) {
            setFilteredTags(tags.filter(tag => tag.name.toLowerCase().includes(inputValue.toLowerCase())));
        } else {
            setFilteredTags([]);
        }
    };

    const handleTagSelection = (tagName) => {
        setSelectedTags(prev => [...prev, tagName]);
        setTagInput('');
        setFilteredTags([]);
    };

    const handlePostClick = async () => {
        const response = await fetch('/api/postOperations/createPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: editorContent,
                userId,
                tagNames: selectedTags
            }),
        });

        if (response.ok) {
            console.log('Post created successfully');
            setEditorContent('');
            setSelectedTags([]);
        } else {
            const errorData = await response.json();
            console.error('Failed to create post:', errorData.error);
        }
    };

    return (
        <div className="bg-gray-100 p-5 rounded-lg">
            <div className="h-50 mb-5 text-black">
                <QuillNoSSRWrapper
                    value={editorContent}
                    placeholder="Once upon a time..."
                    theme="snow"
                    modules={{
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                            ['blockquote', 'code-block'],

                            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                            [{ 'direction': 'rtl' }],                         // text direction

                            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                            [{ 'font': [] }],
                            [{ 'align': [] }],

                            ['clean']                                         // remove formatting button
                        ]
                    }}
                    style={{ height: '300px', width: '100%'}} // Increased height
                    onChange={handleChange}
                />
            </div>

            <div className="flex justify-end mt-4 items-center pt-10">
                <div className="relative text-black">
                    <input
                        type="text"
                        value={tagInput}
                        onChange={handleTagInputChange}
                        className="rounded-lg border px-1 py-1 w-3/4"
                        placeholder="Add tags..."
                    />
                    {filteredTags.length > 0 && (
                        <div className="dropdown-menu">
                            {filteredTags.map(tag => (
                                <div key={tag.id} onClick={() => handleTagSelection(tag.name)} className="dropdown-item">
                                    {tag.name}
                                </div>
                            ))}
                            <div onClick={() => handleTagSelection(tagInput)} className="dropdown-item">
                                Create tag: {tagInput}
                            </div>
                        </div>
                    )}
                </div>
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

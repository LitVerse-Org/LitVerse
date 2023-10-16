import React, { useState, useEffect } from 'react';

const TagSelector = ({ onSelectTags }) => {
	const [selectedTags, setSelectedTags] = useState([]);
	const [availableTags, setAvailableTags] = useState([]); // Initialize as empty array
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		// Fetch available tags from the database
		fetch('/api/tagOperations/getTags')
			.then(res => res.json())
			.then(data => {
				setAvailableTags(data.map(tag => tag.name));
			})
			.catch(err => console.error('Failed to fetch tags:', err));
	}, []);

	const toggleTag = (tag) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter(t => t !== tag));
		} else if (selectedTags.length < 5) {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	const createNewTag = (tagName) => {
		fetch('/api/tagOperations/createTag', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ tagName }),
		})
			.then(res => res.json())
			.then(data => {
				setAvailableTags([...availableTags, data.name]);
				toggleTag(data.name);
			})
			.catch(err => console.error('Failed to create tag:', err));
	};

	useEffect(() => {
		onSelectTags(selectedTags);
	}, [selectedTags]);

	return (
		<div>
			<label>Tags</label>
			<input
				type="text"
				placeholder="Search tags..."
				value={searchTerm}
				onChange={(e) => {
					const newTerm = e.target.value.toLowerCase();
					setSearchTerm(newTerm);
					if (!availableTags.includes(newTerm) && newTerm !== '') {
						createNewTag(newTerm);
					}
				}}
			/>
			<div>
				{availableTags.filter(tag => tag && tag.includes(searchTerm)).map(tag => (
					<div key={tag}>
						<input
							type="checkbox"
							checked={selectedTags.includes(tag)}
							onChange={() => toggleTag(tag)}
						/>
						{tag}
					</div>
				))}
			</div>
			{selectedTags.length === 5 && <p>You can select up to 5 tags.</p>}
		</div>
	);
};

export default TagSelector;

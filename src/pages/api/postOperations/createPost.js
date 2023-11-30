import prisma from '/utilities/db';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).end(); // Method Not Allowed
	}

	const { content, userId, tagNames } = req.body;

	try {
		// Ensure userId is a valid number
		const parsedUserId = parseInt(userId);
		if (isNaN(parsedUserId)) {
			return res.status(400).json({ error: 'Invalid user ID' });
		}

		// Process tags - create new ones if they don't exist
		const tagData = tagNames && tagNames.length > 0
			? await Promise.all(tagNames.slice(0, 3).map(async (name) => {
				let tag = await prisma.tag.findUnique({ where: { name } });
				if (!tag) {
					tag = await prisma.tag.create({ data: { name } });
				}
				return { id: tag.id };
			}))
			: [];

		const newPost = await prisma.post.create({
			data: {
				content,
				userId: parsedUserId, // Use parsed userId
				tags: {
					connect: tagData,
				},
			},
		});

		return res.status(201).json(newPost);
	} catch (error) {
		console.error('Error creating post:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
}
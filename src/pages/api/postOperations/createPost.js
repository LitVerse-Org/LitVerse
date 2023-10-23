import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

// Authentication middleware can be added here to fetch the userId

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).end(); // Method Not Allowed
	}

	const session = await getSession({req});
	const userId = session?.user?.id;

	if(!userId){
		return res.status(401).json({error: 'Not authorized'});
	}

	const { content } = req.body;

	if (!content || typeof content !== 'string') {
		return res.status(400).json({ error: 'Invalid content' });
	}

	try {
		const post = await prisma.post.create({
			data: {
				content,
				userId: parseInt(userId, 10),
				mediaType: 'none',  // For now, only text is being posted
				//tags: [],  // Commented out for now, focusing on basic functionalities only. Will come back to tag functionality later.
			},
		});

		return res.status(201).json(post);
	} catch (error) {
		console.error('Error creating post:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
}

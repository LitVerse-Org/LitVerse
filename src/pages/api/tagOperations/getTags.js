import prisma from '/prisma';import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		return res.status(405).end(); // Method Not Allowed
	}

	try {
		// Assuming you have a Tag model in your Prisma schema
		const tags = await prisma.tag.findMany({
			select: {
				name: true,
			},
		});
		console.log(tags)

		return res.status(200).json(tags);
	} catch (error) {
		console.error('Error fetching tags:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
}

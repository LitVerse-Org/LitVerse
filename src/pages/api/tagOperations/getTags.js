import prisma from '/utilities/db';

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		return res.status(405).end(); // Method Not Allowed
	}

	try {
		// Fetching both id and name fields for each tag
		const tags = await prisma.tag.findMany({
			select: {
				id: true,
				name: true,
			},
		});

		return res.status(200).json(tags);
	} catch (error) {
		console.error('Error fetching tags:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
}
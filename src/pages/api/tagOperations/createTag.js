import prisma from '/prisma';
export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).end(); // Method Not Allowed
	}

	const { tagName } = req.body;

	if (!tagName || typeof tagName !== 'string') {
		return res.status(400).json({ error: 'Invalid tag name' });
	}

	try {
		// Assuming you have a Tag model in your Prisma schema
		const tag = await prisma.tag.create({
			data: {
				name: tagName,
			},
		});

		return res.status(201).json(tag);
	} catch (error) {
		console.error('Error creating tag:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
}

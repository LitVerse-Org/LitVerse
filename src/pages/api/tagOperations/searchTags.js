import prisma from '/utilities/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Invalid query' });
  }

  try {
    const tags = await prisma.tag.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    return res.status(200).json(tags);
  } catch (error) {
    console.error('Error searching tags:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

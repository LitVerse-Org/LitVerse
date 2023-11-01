import prisma from '/utilities/db';

export default async function searchUsers(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          startsWith: query,
        },
      },
      select: {
        username: true,
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

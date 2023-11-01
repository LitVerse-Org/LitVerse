import prisma from '/utilities/db';


export default async function searchUserByUsername(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ userId: user.id });
  } catch (error) {
    console.error('Error searching user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

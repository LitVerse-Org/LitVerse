import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' }); // Only allow GET requests
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId)
      },
      select: {
        id: true,
        email: true,
        username: true,
        bio: true,
        profileImgS3URL: true,
        coverImgS3URL: true,
        backgroundImgS3URL: true,
        // ... you can add other fields as needed but DO NOT include password or any other sensitive info
        posts: {
          select: {
            id: true,
            content: true,
            mediaUrl: true,
            mediaType: true
            // ... add other post fields if needed
          }
        },
        // ... you can add similar select for other relations if needed (like followers, following, etc.)
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

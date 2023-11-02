import prisma from '/utilities/db';

export default async function likePost(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { userId, postId } = req.body;

  if (!userId || !postId) {
    return res.status(400).json({ error: 'userId and postId are required' });
  }

  try {
    // Create a like record
    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
    return res.status(201).json({ message: 'Successfully liked the post' });
  } catch (error) {
    console.error('Error liking the post:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

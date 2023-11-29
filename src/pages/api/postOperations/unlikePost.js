import prisma from '/utilities/db';

export default async function unlikePost(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { userId, postId } = req.body;

    if (!userId || !postId) {
        return res.status(400).json({ error: 'userId and postId are required' });
    }

    try {
        // Delete the like record
        await prisma.like.delete({
            where: {
                userId_postId: {
                    userId: Number(userId),
                    postId: Number(postId),
                },
            },
        });
        return res.status(200).json({ message: 'Successfully unliked the post' });
    } catch (error) {
        console.error('Error unliking the post:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

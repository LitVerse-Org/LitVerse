import prisma from '/utilities/db';

export default async function getLikedPosts(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'Bad Request: User ID is required' });
    }

    try {
        const likes = await prisma.like.findMany({
            where: {
                userId: parseInt(userId, 10)
            },
            include: {
                post: {
                    include: {
                        user: true,
                        likes: true,
                        tags: true
                    }
                }
            }
        });

        const likedPosts = likes.map(like => like.post);

        return res.status(200).json(likedPosts);
    } catch (error) {
        console.error('Error fetching liked posts:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

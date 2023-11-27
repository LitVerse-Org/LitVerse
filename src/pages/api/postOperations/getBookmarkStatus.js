// getBookmarkStatus.js
import prisma from '/utilities/db';

export default async function handle(req, res) {
    const { userId, postId } = req.query; // assuming you are sending the userId and postId as query parameters

    try {
        const bookmark = await prisma.bookmark.findUnique({
            where: {
                userId_postId: {
                    userId: parseInt(userId, 10), // Parse the userId to ensure it's a number
                    postId: parseInt(postId, 10), // Parse the postId to ensure it's a number
                },
            },
        });

        // If bookmark exists, it means the post is bookmarked by the user
        const isBookmarked = bookmark !== null;

        res.status(200).json({ isBookmarked: isBookmarked });
    } catch (error) {
        res.status(500).json({ error: `Error fetching bookmark status: ${error.message}` });
    } finally {
        await prisma.$disconnect();
    }
}

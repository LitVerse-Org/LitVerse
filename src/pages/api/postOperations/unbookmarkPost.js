// unbookmarkPost.js
import prisma from '/utilities/db';

export default async function handle(req, res) {
    const { userId, postId } = req.body;

    try {
        // Check if the bookmark exists
        const existingBookmark = await prisma.bookmark.findUnique({
            where: {
                userId_postId: {
                    userId: userId,
                    postId: postId,
                },
            },
        });

        if (!existingBookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }

        await prisma.bookmark.delete({
            where: {
                userId_postId: {
                    userId: userId,
                    postId: postId,
                },
            },
        });

        res.status(200).json({ message: 'Bookmark removed successfully' });
    } catch (error) {
        res.status(500).json({ error: `Error unbookmarking the post: ${error.message}` });
    } finally {
        await prisma.$disconnect();
    }
}

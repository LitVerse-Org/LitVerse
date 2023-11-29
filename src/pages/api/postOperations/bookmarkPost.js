// bookmarkPost.js
import prisma from '/utilities/db';


export default async function handle(req, res) {
    const { userId, postId } = req.body;

    try {
        // Check if the bookmark already exists
        const existingBookmark = await prisma.bookmark.findUnique({
            where: {
                userId_postId: {
                    userId: userId,
                    postId: postId,
                },
            },
        });

        if (existingBookmark) {
            return res.status(400).json({ message: 'Post already bookmarked' });
        }

        const bookmark = await prisma.bookmark.create({
            data: {
                userId: userId,
                postId: postId,
            },
        });

        res.status(200).json(bookmark);
    } catch (error) {
        res.status(500).json({ error: `Error bookmarking the post: ${error.message}` });
    } finally {
        await prisma.$disconnect();
    }
}

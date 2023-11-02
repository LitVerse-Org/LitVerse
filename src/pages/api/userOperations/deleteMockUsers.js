import prisma from '/utilities/db';


export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            // Delete related posts first
            await prisma.post.deleteMany();

            // Now delete the users
            const deleteCount = await prisma.user.deleteMany();
            res.status(200).json({ message: `Deleted ${deleteCount.count} users from the database.` });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting users.', error: error.message });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

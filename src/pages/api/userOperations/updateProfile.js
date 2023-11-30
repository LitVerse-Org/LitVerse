import prisma from '/utilities/db';

export default async function updateProfile(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { userId, username, email, bio} = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(userId) // Parse userId to integer
            },
            data: {
                username,
                email,
                bio,
            },
        });

        return res.status(200).json({ message: 'Profile updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating the profile:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

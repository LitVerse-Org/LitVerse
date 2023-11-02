// src/pages/api/userOperations/loginHandler.js
import prisma from '/utilities/db';
import { getSession } from 'next-auth/react';
import bcrypt from "bcrypt";
import validator from "validator";



export default async function loginHandler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Fetch user
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // At this point, the user is authenticated.
        // The user object is returned and will be used by NextAuth to create a session.
        return res.status(200).json({ id: user.id, email: user.email, username: user.username });
    }

    return res.status(405).end(); // Method not allowed
}

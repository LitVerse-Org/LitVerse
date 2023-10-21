import prisma from '/prisma';
import { getSession } from 'next-auth/react';
import bcrypt from "bcrypt";
import validator from "validator";

export default async function registrationHandler(req, res) {
    if (req.method === 'POST') {
        const { email, username, password } = req.body;

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, error: "Invalid email format" });
        }

        // Validate username
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return res.status(400).json({ success: false, error: "Username can only contain letters, numbers, and underscores" });
        }

        // Validate password
        if (password.length < 8) {
            return res.status(400).json({ success: false, error: "Password must be at least 8 characters long" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const newUser = await prisma.user.create({
                data: {
                    email,
                    username,
                    password: hashedPassword
                }
            });
            return res.status(200).json({ success: true });
        } catch (error) {
            console.error("Registration Error:", error.message);
            return res.status(400).json({ success: false, error: error.message });
        }
    }
    return res.status(405).end();
}

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaClient } from "@prisma/client";
import validator from "validator";

const prisma = new PrismaClient();

const generateUniqueUsername = () => {
    // Replace with your unique username logic
    return "unique_username";
};

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn(user, account, profile) {
            // Validate email for social logins
            if (!validator.isEmail(user.email)) {
                return false;
            }

            const existingUser = await prisma.user.findFirst({
                where: {
                    email: user.email,
                },
            });

            if (existingUser) {
                return true;
            }

            await prisma.user.create({
                data: {
                    email: user.email,
                    username: profile.username || generateUniqueUsername(),
                },
            });

            return true;
        },
        async session(session, token) {
            if (session?.user && token?.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
});

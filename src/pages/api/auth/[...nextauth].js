import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                    },
                });

                if (user && await bcrypt.compare(credentials.password, user.password)) {
                    return { id: user.id.toString(), email: user.email, name: user.username };
                } else {
                    return null;
                }
            }
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
            //console.log("signIn User object structure:", JSON.stringify(user, null, 2));

            const userEmail = user.user?.email;

            //console.log("signIn Email:", userEmail);
            //console.log("signIn Account:", user.account);
            console.log("signIn Profile:", user.profile);

            if (userEmail && validator.isEmail(userEmail)) {
                const existingUser = await prisma.user.findFirst({
                    where: {
                        email: userEmail,
                    },
                });

                if (existingUser) {
                    return true;
                }

                if (user.user?.name) {
                    await prisma.user.create({
                        data: {
                            email: userEmail,
                            username: user.user.name,
                        },
                    });
                    return true;
                } else {
                    console.log("User name is undefined");
                    return false;
                }
            } else {
                console.log("Invalid email");
                return false;
            }
        },
        async session(session, token) {
            console.log("session Session:", session);
            console.log("session Token:", token);

            if (session?.user && token?.sub) {
                session.user.id = token.sub;
            }

            session.token = token;  // <-- Add this line
            return session;
        },
    },
});

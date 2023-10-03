import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";  // For email/password
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from 'bcrypt';  // For password hashing

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
    CredentialsProvider({
      // The name to display on the sign-in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        // Check if username and password are valid
        const user = await prisma.user.findFirst({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
          return { id: user.id, username: user.username, email: user.email };
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
      // For custom credential login
      if (account.provider === 'credentials') {
        if (user) {
          return true;
        }
        return false;
      }

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

      // Hash password if this is a custom registration
      let hashedPassword = null;
      if (account.provider === 'credentials') {
        hashedPassword = await bcrypt.hash(user.password, 10);
      }

      await prisma.user.create({
        data: {
          email: user.email,
          username: profile.username || generateUniqueUsername(),
          password: hashedPassword,  // Save hashed password if this is a custom registration
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
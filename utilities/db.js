import { PrismaClient } from "@prisma/client";

let prisma;

// Check if we're in a serverless environment or in development
if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!globalThis.prisma) {
        globalThis.prisma = new PrismaClient();
    }
    prisma = globalThis.prisma;
}

export default prisma;
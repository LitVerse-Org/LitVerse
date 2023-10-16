const { PrismaClient } = require('@prisma/client');

// Check if we're in a Node.js or browser runtime
if (typeof window === 'undefined') {
	// We are in a Node.js runtime
	let prisma;

	if (!prisma) {
		prisma = new PrismaClient();
		if (process.env.NODE_ENV === 'development') {
			globalThis.prisma = prisma;
		}
	}

	module.exports = prisma;
} else {
	throw new Error('Do not import `prisma.js` from outside of the server code.');
}

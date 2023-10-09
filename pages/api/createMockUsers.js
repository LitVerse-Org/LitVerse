import registrationHandler from "./registrationHandler";
import faker from 'faker';

export default async function createMockUsers(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    const numberOfUsers = 100;  // Adjust as needed

    for (let i = 0; i < numberOfUsers; i++) {
        const email = faker.internet.email();
        const username = faker.internet.userName();
        const password = faker.internet.password(12);

        // Using the registration handler to create a user
        await registrationHandler({ body: { email, username, password }, method: 'POST' }, res);
    }

    res.status(200).json({ success: true, message: `Created ${numberOfUsers} mock users!` });
}

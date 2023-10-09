import registrationHandler from "./registrationHandler";
import faker from 'faker';

export default async function createMockUsers(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    const numberOfUsers = 100;  // Adjust as needed
    let createdCount = 0;
    let errors = [];

    for (let i = 0; i < numberOfUsers; i++) {
        const email = faker.internet.email();
        const username = faker.internet.userName().replace(/[^a-zA-Z0-9_]/g, '_');
        const password = faker.internet.password(12);

        try {
            // Using a mock response object to catch the result
            let mockRes = {
                status: function (statusCode) {
                    this.statusCode = statusCode;
                    return this;
                },
                json: function (data) {
                    this.data = data;
                    return this;
                },
                end: function () {
                    return this;
                }
            };

            await registrationHandler({ body: { email, username, password }, method: 'POST' }, mockRes);

            if (mockRes.data && mockRes.data.success) {
                createdCount++;
            } else {
                errors.push(`Error for user ${i + 1}: ${mockRes.data.error}`);
            }
        } catch (error) {
            errors.push(`Error for user ${i + 1}: ${error.message}`);
        }
    }

    res.status(errors.length === 0 ? 200 : 400).json({ success: errors.length === 0, message: `Created ${createdCount} mock users.`, errors: errors });
}

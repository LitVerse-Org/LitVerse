// hooks/useUserId.js
import { useSession } from "next-auth/react";

export function useUserId() {
    const { data: session } = useSession();

    // Handle the case where the session is not available yet
    if (!session || !session.token || !session.token.sub) {
        // Return null or throw an error, depending on your use case
        return null;
    }

    // Parse the user ID as an integer
    const userID = parseInt(session.token.sub, 10);

    // Check if the parsing resulted in a valid number
    if (isNaN(userID)) {
        // Handle the case where sub is not a number
        console.error('User ID is not a valid number:', session.token.sub);
        return null;
    }

    return userID;
}

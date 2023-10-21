import React, { useEffect } from "react";
import { getSession, useSession, signOut } from "next-auth/react";

export default function Home() {
    const handleLogout = async () => {
        await signOut(); // Call the signOut function to log the user out
    };

    const { data: session, status } = useSession();

    useEffect(() => {
        async function fetchData() {
            const session = await getSession();
            console.log("Current Session token in home.js page from `getSession()`: ", session);
        }
        fetchData();
        console.log("Session object from useSession:", session);
        console.log("Status from useSession:", status);
    }, []);


    return (
        <div>
            {status === "loading" ? (
                <p>Loading...</p>
            ) : status === "authenticated" ? (
                <div>
                    <p>
                        {console.log('Rendering session.user:', session.user)}
                        Signed in as {session.user?.email || session.user?.username || "Unknown"}
                    </p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div
                    style={{
                        background: "pink",
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <span style={{ color: "green", fontSize: "2em" }}>HOME</span>
                </div>
            )}
        </div>
    );
}

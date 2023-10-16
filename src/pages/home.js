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
            console.log("session in Home page:", session);
            console.log("session.token in Home page:", session?.token);
        }

        fetchData();
    }, []);


    return (
        <div>
            {status === "loading" ? (
                <p>Loading...</p>
            ) : status === "authenticated" ? (
                <div>
                    <p>
                        Signed in as {session.user?.email || "Unknown"} {/* Check if session.user exists */}
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

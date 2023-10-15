import React, { useEffect } from "react";
import { getSession, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
    useEffect(() => {
        const fetchData = async () => {
            const session = await getSession();
            console.log("localhost:3000/Home Page Session log: ", session);
        };

        fetchData();
    }, []);

    const { data: session, status } = useSession();

    const handleLogout = async () => {
        await signOut(); // Call the signOut function to log the user out
    };

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

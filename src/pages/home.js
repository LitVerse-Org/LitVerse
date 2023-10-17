<<<<<<< Updated upstream
import React, { useEffect } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
=======
import React from "react";
import Sidebar from "../components/Sidebar";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
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
=======
        <div style={{
            background: "black",
            height: "110vh",
            display: "flex",
            flexDirection: "column",
        }}>
            {/* Top Bar */}
            <div style={{
                width: "100%",
                height: "250px",
                backgroundColor: "#333",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
               <span style={{
                fontSize: "3em",
                color: "#E9E9E9",
                textShadow: "2px 2px 4px #000",
                fontFamily: "'Arial', sans-serif",
                fontWeight: "bold"
            }}>
                    Home
            </span>
            </div>

            {/* Row container for Sidebar and Content */}
            <div style={{
                display: "flex",
                flex: 1,
                width: "100%",
            }}>
                <Sidebar />
                <div style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "500px"  // Adjust as needed based on your layout
                }}>
                    <span style={{ color: "green", fontSize: "2em" }}>
                        HOME
                    </span>
                </div>
            </div>
>>>>>>> Stashed changes
        </div>
    );
}

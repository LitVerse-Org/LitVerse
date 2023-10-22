import React, { useEffect } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import sidebar from "../components/sidebar";

export default function Home() {
    const { data: session, status } = useSession(); // Use the useSession hook here

    const handleLogout = async () => {
        await signOut();
    };

    useEffect(() => {
        async function fetchData() {
            const fetchedSession = await getSession();
            console.log("Current Session token in home.js page from `getSession()`: ", fetchedSession);
        }
        fetchData();
        console.log("Session object from useSession:", session);
        console.log("Status from useSession:", status);
    }, []);

    return (
        <div>
            <div
                style={{
                    background: "pink",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div style={{ color: "green", fontSize: "2em" }}>HOME</div>
                <div>
                    <p>
                        {console.log('Rendering session.user:', session)}
                        Signed in as {JSON.stringify(session)}
                    </p>
                    <button onClick={handleLogout} className="bg-red-800">Logout</button>
                </div>
            </div>

        {/*<div style={{*/}
        {/*    background: "black",*/}
        {/*    height: "110vh",*/}
        {/*    display: "flex",*/}
        {/*    flexDirection: "column",*/}
        {/*}}>*/}
        {/*    /!* Top Bar *!/*/}
        {/*    <div style={{*/}
        {/*        width: "100%",*/}
        {/*        height: "250px",*/}
        {/*        backgroundColor: "#333",*/}
        {/*        display: "flex",*/}
        {/*        justifyContent: "center",*/}
        {/*        alignItems: "center"*/}
        {/*    }}>*/}
        {/*       <span style={{*/}
        {/*        fontSize: "3em",*/}
        {/*        color: "#E9E9E9",*/}
        {/*        textShadow: "2px 2px 4px #000",*/}
        {/*        fontFamily: "'Arial', sans-serif",*/}
        {/*        fontWeight: "bold"*/}
        {/*    }}>*/}
        {/*            Home*/}
        {/*    </span>*/}
        {/*    </div>*/}

        {/*    /!* Row container for Sidebar and Content *!/*/}
        {/*    <div style={{*/}
        {/*        display: "flex",*/}
        {/*        flex: 1,*/}
        {/*        width: "100%",*/}
        {/*    }}>*/}
        {/*        <Sidebar />*/}
        {/*        <div style={{*/}
        {/*            display: "flex",*/}
        {/*            flex: 1,*/}
        {/*            justifyContent: "center",*/}
        {/*            alignItems: "center",*/}
        {/*            marginLeft: "500px"  // Adjust as needed based on your layout*/}
        {/*        }}>*/}
        {/*            <span style={{ color: "green", fontSize: "2em" }}>*/}
        {/*                HOME*/}
        {/*            </span>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        </div>
    );
}

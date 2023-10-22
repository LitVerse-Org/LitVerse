import React from "react";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";

export default function Profile() {
    return (
        <div style={{
            display: "flex",
            height: "100vh",
            background: "white",
            margin: 0,
            padding: 0
        }}>
            <Sidebar />

            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                margin: 0,
                padding: 0
            }}>
                <ProfileHeader username="Your Username" postCount={5} />
                <div style={{
                    flex: 1,
                    background: "#ffffff",
                    color: "#000000"
                }}>
                    {/* Additional content goes here */}
                </div>
            </div>
        </div>
    );
}

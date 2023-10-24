import React, { useEffect } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import Layout from "../components/Layout";
import TextEditor from "@/components/createPostComponents/TextEditor";

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
        <Layout>
        <div>
            <div
                
            >
                
                <h1 className="text-zinc-200 text-xl">HOME</h1>
                <div>
                    <h2 className="text-zinc-200">
                        {console.log('Rendering session.user:', session)}
                        signed in as {session? session.name : 'guest'}
                    </h2>
                    <TextEditor />
                </div>
        </div>
                
        </div>
        </Layout>
    );
}

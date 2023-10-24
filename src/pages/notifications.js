
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import { useSession, getSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Notifications() {
    const { data: session, status } = useSession(); // Use the useSession hook here
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();

        router.push("/login");
    };

    useEffect(() => {
        async function fetchData() {
            const fetchedSession = await getSession();
            console.log(
                "Current Session token in notifications.js page from `getSession()`: ",
                fetchedSession
            );
        }
        fetchData();

    }, []);

    return (
        <Layout>
            <div>
                <div>
                    <h1
                        style={{
                            color: "white",
                            fontSize: "1em",
                        }}
                    >
                        {JSON.stringify(session.token.email)}'s Notifications
                    </h1>
                    <div>
                        <p>
                            {console.log("Rendering session.user:", session)}
                        </p>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-2 sm:px-4 sm:py-2 flex font-roboto-slab text-zinc-200 font-bold bg-darkGreen focus:bg-black rounded-full"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

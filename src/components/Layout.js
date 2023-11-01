import SearchInput from "./rightnavbar/SearchInput";
import Sidebar from "./Sidebar/index";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Layout({ children }) {
    const { data: session } = useSession();
    const router = useRouter();

    const handleAction = async (actionType) => {
        if (actionType === 'logout') {
            await signOut();
        } else if (actionType === 'login') {
            router.push("/login");
        } else if (actionType === 'register') {
            router.push("/register");
        }
    };

    return (
        <div className="grid grid-cols-12 max-w-screen mx-auto min-h-screen">
            <div className="col-span-3 bg-black-200 h-full pr-3 text-zinc">
                <Sidebar />
            </div>
            <div className="col-span-6 bg-gray-200 h-full p-2 h-screen border-l border-r rl-stripe-bg">
                {children}
            </div>
            <div className="col-span-3 bg-black-800 h-full pl-3 text-zinc flex flex-col items-end top-3 right-3">
                <div className="flex ">
                    {session && (
                        <div className="ml-3 px-3 py-2 sm:px-4 sm:py-2 flex font-roboto-slab text-zinc-200 font-bold"
                        >
                            Welcome, {JSON.stringify(session.token.email)}
                        </div>
                    )}
                    <button
                        onClick={() => handleAction(session ? 'logout' : 'login')}
                        className="px-3 py-4 sm:px-4 sm:py-2 flex font-roboto-slab text-zinc-200 font-bold bg-darkGreen focus:bg-black rounded-full"
                    >
                        {session ? "Logout" : "Login"}
                    </button>
                    {!session && (
                        <button
                            onClick={() => handleAction('register')}
                            className="ml-3 px-3 py-2 sm:px-4 sm:py-2 flex font-roboto-slab text-zinc-200 font-bold bg-darkGreen focus:bg-black rounded-full"
                        >
                            Register
                        </button>
                    )}
                </div>
                <div className="mt-2 w-full">
                    <SearchInput />
                </div>
            </div>
        </div>
    );
}

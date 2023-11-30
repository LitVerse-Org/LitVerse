// RightSideBar.js
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SearchInput from '@/components/RightNavBar/SearchInput';

const RightNavBar = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleAction = async (actionType) => {
        switch (actionType) {
            case 'logout':
                await signOut();
                break;
            case 'login':
                router.push('/login');
                break;
            case 'register':
                router.push('/register');
                break;
            default:
                break;
        }
    };

    return (
        <div className="fixed top-0 right-0 w-1/8 h-screen bg-black-800 pl-2 text-zinc flex flex-col items-end">
            <div className="flex ">
                {session && (
                    <div className="py-2 sm:px-4 sm:py-2 flex font-roboto-slab text-zinc-200 font-bold">
                        Welcome, {session.token.email}
                    </div>
                )}
                <button
                    onClick={() => handleAction(session ? 'logout' : 'login')}
                    className="px-1 py-4 sm:px-4 sm:py-2 flex items-center justify-center font-roboto-slab text-zinc-200 font-bold bg-darkGreen focus:bg-black rounded-full"
                >
                    {session ? 'Logout' : 'Login'}
                </button>
                {!session && (
                    <button
                        onClick={() => handleAction('register')}
                        className=" py-2 sm:px-4 sm:py-2 flex font-roboto-slab text-zinc-200 font-bold bg-darkGreen focus:bg-black rounded-full"
                    >
                        Register
                    </button>
                )}
            </div>
            <div className="mt-2 w-full">
                <SearchInput />
            </div>
        </div>
    );
};

export default RightNavBar;

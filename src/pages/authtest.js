// import {getSession, useSession} from 'next-auth/react';
// import {useEffect} from "react";
//
// export default function AuthTest() {
//     const { data: session } = useSession();
//
//     useEffect(() => {
//         async function fetchData() {
//             const session = await getSession();
//             console.log("Current Session token in home.js page from `getSession()`: ", session);
//         }
//         fetchData();
//         console.log("Session object from useSession:", session);
//         console.log("Status from useSession:", status);
//     }, []);
//
//     return (
//         <div className="flex items-center justify-center h-screen">
//             {session ? (
//                 <button
//                     className="bg-green-500 text-white p-4 rounded-full"
//                 >
//                     Valid Session
//                 </button>
//             ) : (
//                 <button
//                     className="bg-red-500 text-white p-4 rounded-full"
//                 >
//                     Invalid Session
//                 </button>
//             )}
//         </div>
//     );
// }

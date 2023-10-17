<<<<<<< Updated upstream
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/home');
  }, []);

  return null; // you can also return some loading text here if you want
};

export default IndexPage;
=======
//import Image from 'next/image';
import { Inter } from 'next/font/google';
import Sidebar from '../components/Sidebar';  // Importing the Sidebar component

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="flex flex-col h-screen"> {/* Use column flex layout for the outer container */}
      
      {/* Upper bar with full width */}
      <div className="flex w-full h-16 justify-center items-center border-b border-gray-300 bg-gradient-to-b from-zinc-200">
          Home
      </div>

      <Sidebar className="w-full bg-gray-200" /> {/* Sidebar with full width */}

      <main className={`flex-grow flex flex-col items-center justify-center p-24 ${inter.className}`}> {/* Adjust main content to take up the remaining vertical space */}
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          {/* ... rest of your code ... */}
        </div>
      </main>
    </div>
  );
}

>>>>>>> Stashed changes

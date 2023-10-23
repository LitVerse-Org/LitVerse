import { useState, useEffect } from 'react';
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage({ providers }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession(); // This is the correct way to get session data
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();  // Prevent default form submission

    const res = await fetch('/api/userOperations/loginHandler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.id) {
      signIn('credentials', { email, password })
          .then(() => {
            router.push('/home'); // Redirect to /home upon successful login
          });
    } else {
      setShowError(true); // Display an error message
    }
  };

  useEffect(() => {
    if (session) {
      router.push('/home'); // Redirect to /home if already authenticated
    }
  }, [session, router]);

  return (
      <div className="flex items-center justify-center h-screen rl-stripe-bg">
        <img
            src="/white_logo_dark_background.png"
            alt="Logo"
            className="absolute top-12 w-1/3"
            style={{left: '1rem' }}
        />
        <img
            src="/spacedoodle.png"
            alt="Logo"
            className="absolute bottom-0 w-1/4"
            style={{ right: '0rem' }}
        />
        <div className="p-8 rounded-lg shadow-md w-96">
          <div className="mb-2">
            <input
                type="text"
                placeholder="Email"
                className="font-roboto-slab font-bold w-full p-3 rounded-full border border-blue-300 text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
                type="password"
                placeholder="Password"
                className="font-roboto-slab font-bold w-full p-3 rounded-full border border-blue-300 text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <button
                className="font-roboto-slab font-bold bg-darkGreen text-xl text-white p-2 rounded-full w-full"
                onClick={handleSignIn} // Updated this line
            >
              Sign In
            </button>
            {showError && (
                <div
                    className=" font-roboto-slab font-bold text-red-500 text-center my-2"
                    style={{ animation: 'fadeIn 0.5s ease-out', animationFillMode: 'forwards' }}
                >
                  Incorrect Email or Password
                </div>
            )}
          </div>
          <div className="border-b border-gray-300 my-4"></div>
          <div className="mt-4">
            {Object.values(providers).map((provider) => (
                provider.id !== 'credentials' && (
                    <div key={provider.id} className="mb-2">
                  <button
                      onClick={async () => {
                        await signIn(provider.id);
                      }}
                      className="font-roboto-slab font-bold text-l bg-white pl-2 pr-4 py-1 text-black rounded-full flex items-center justify-center mx-auto"
                      style={{ maxWidth: '80%' }}
                  >
                    <img
                        src={
                          provider.id === "google"
                              ? "/google.png"
                              : provider.id === "apple"
                                  ? "/apple.png"
                                  : provider.id === "facebook"
                                      ? "/facebook.png"
                                      : ""
                        }
                        alt=""
                        className="h-7"
                    />
                    Sign in with {provider.name}
                  </button>

                </div>

                )
            ))}
          </div>
          <div className="border-b border-gray-300 my-4"></div>
          <div className="mb-2 text-center">
            <button className="font-roboto-slab font-bold text-black p-1 rounded-full w-56 bg-white" onClick={() => setShowModal(true)}>
              Forgot Email/Password?
            </button>
          </div>
          <div className="mb-2 text-center">
            <button className=" font-roboto-slab font-bold position-center text-black p-1 rounded-full w-56 bg-white" onClick={() => router.push('/register')}>
              No Account? Register Here
            </button>
          </div>
        </div>

        {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black">
              <div className="bg-darkGreen p-16 rounded-lg shadow-md w-128 relative">
                <button className="absolute top-3 right-2 font-bold text-darkGreen text-2xl rounded-tl-lg p-2 border-2 border-white" onClick={() => setShowModal(false)}>X</button>
                <div className="font-roboto-slab font-bold text-center text-white text-2xl font-bold mb-8">
                  Find your LitVerse Account
                </div>
                <div className="mb-8">
                  <input
                      type="text"
                      placeholder="(UNDER CONSTRUCTION) Enter your email, username, or phone number"
                      className="w-full p-3 rounded text-xs border border-white text-black"
                  />
                </div>
                <div className="text-center">
                  <button className="bg-black text-white p-2 rounded text-xl w-40">
                    Next
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

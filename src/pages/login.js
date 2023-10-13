import { useState } from 'react';
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage({ providers }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { data, status } = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    // Your logic to fetch the user from your database.
    const userFromDb = await fetchUserFromDb(username);

    if (userFromDb) {
      const isPasswordCorrect = await bcrypt.compare(password, userFromDb.password);

      if (isPasswordCorrect) {
        // Your logic to log the user in and possibly set a session.
        loginUser(userFromDb);
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);  // Hide the error message after 3 seconds
      }
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);  // Hide the error message after 3 seconds
    }
  };


  if (status === "authenticated") {
    router.push("/");
  }

  return (
      <div className="flex items-center justify-center h-screen rl-stripe-bg">
        <img
            src="/doodle1.png"
            alt="Logo"
            className="absolute top-12 w-1/3"
            style={{left: '3rem' }}
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
                placeholder="Username"
                className="w-full p-3 rounded-full border border-blue-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-full border border-blue-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <button
                className="text-white p-2 rounded-full w-full"
                style={{ backgroundColor: '#373a3a' }}
                onClick={handleSignIn}
            >
              Sign In
            </button>
            {showError && (
                <div
                    className="text-red-500 text-center my-2"
                    style={{ animation: 'fadeIn 0.5s ease-out', animationFillMode: 'forwards' }}
                >
                  Incorrect Username or Password
                </div>
            )}
          </div>
          <div className="mb-2 text-center">
            <button className="text-black p-1 rounded-full w-56 bg-white" onClick={() => setShowModal(true)}>
              Forgot Username/Password?
            </button>
          </div>
          <div className="mb-2 text-center">
            <button className="position-center text-black p-1 rounded-full w-56 bg-white" onClick={() => router.push('/register')}>
              No Account? Register Here
            </button>
          </div>
          <div className="border-b border-gray-300 my-2"></div>
          <div className="mt-4">
            {Object.values(providers).map((provider) => (
                <div key={provider.id} className="mb-4">
                  <button
                      onClick={async () => {
                        await signIn(provider.id);
                      }}
                      className="bg-twitterWhite pl-2 pr-4 py-1 text-black rounded-full flex items-center justify-center mx-auto"
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
            ))}
          </div>
        </div>

        {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black">
              <div className="bg-darkGreen p-16 rounded-lg shadow-md w-128 relative">
                <button className="absolute top-3 right-2 font-bold text-darkGreen text-2xl rounded-tl-lg p-2 border-2 border-white" onClick={() => setShowModal(false)}>X</button>
                <div className="text-center text-white text-2xl font-bold mb-8">
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

//changed structure i kknow you hate me but I alos made the login thing pop a lot more
import { useState } from 'react';
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage({ providers }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { data, status } = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    const userFromDb = await fetchUserFromDb(email);
    if (userFromDb) {
      const isPasswordCorrect = await bcrypt.compare(password, userFromDb.password);
      if (isPasswordCorrect) {
        loginUser(userFromDb);
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="flex items-center justify-center h-screen rl-stripe-bg">
      <img src="/doodle1.png" alt="Logo" className="absolute top-12 w-1/3" style={{left: '3rem' }} />
      <img src="/spacedoodle.png" alt="Logo" className="absolute bottom-0 w-1/4" style={{ right: '0rem' }} />
      <div className="p-8 rounded-lg shadow-md w-96" style={{ backgroundColor: '#f0f0f0' }}>
        <div className="mb-2">
          <input type="text" placeholder="Email" className="w-full p-3 rounded-full border border-blue-300" style={{color: 'black'}} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-2">
          <input type="password" placeholder="Password" className="w-full p-3 rounded-full border border-blue-300" style={{color: 'black'}} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-2">
          <button className="text-white p-2 rounded-full w-full" style={{ backgroundColor: '#373a3a' }} onClick={handleSignIn}>Sign In</button>
        </div>
        {showError && <div className="text-red-500 text-center my-2" style={{ animation: 'fadeIn 0.5s ease-out', animationFillMode: 'forwards' }}>Incorrect Email or Password</div>}
        <div className="mb-2 text-center">
          <button className="text-black p-1 rounded-full w-56 bg-white" onClick={() => setShowModal(true)}>Forgot Email/Password?</button>
        </div>
        <div className="mb-2 text-center">
          <button className="position-center text-black p-1 rounded-full w-56 bg-white" onClick={() => router.push('/register')}>No Account? Register Here</button>
        </div>
        <div className="border-b border-gray-300 my-2"></div>
        <div className="mt-4">
          {Object.values(providers).map((provider) => (
            <button onClick={async () => { await signIn(provider.id); }} className="bg-twitterWhite pl-2 pr-4 py-1 text-black rounded-full flex items-center justify-center mx-auto" style={{ maxWidth: '80%' }}>
              <img src={ provider.id === "google" ? "/google.png" : provider.id === "apple" ? "/apple.png" : provider.id === "facebook" ? "/facebook.png" : "" } alt="" className="h-7" />
              Sign in with {provider.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

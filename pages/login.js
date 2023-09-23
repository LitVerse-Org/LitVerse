import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage({ providers }) {
  const { data, status } = useSession();
  const router = useRouter();

  // Redirect to home if the session is active
  if (status === "authenticated") {
    router.push("/");
  }

  return (
      <div className="flex items-center justify-center h-screen">
        {Object.values(providers).map((provider) => (
            <div key={provider.id}>
              <button
                  onClick={async () => {
                    await signIn(provider.id);
                  }}
                  className="bg-twitterWhite pl-3 pr-5 py-2 text-black rounded-full flex items-center"
              >
                <img
                    src={provider.id === "google" ? "/google.png" : "/apple.png"}
                    alt=""
                    className="h-8"
                />
                Sign in with {provider.name}
              </button>
            </div>
        ))}
      </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

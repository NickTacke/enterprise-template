"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.accessToken) {
        const res = await fetch("http://localhost:8000/", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (res.ok) {
          const text = await res.text();
          setData(text);
        } else {
          setData(await res.text());
        }
      }
    };
    fetchData();
  }, [session]);

  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()} className="mt-4 p-2 bg-red-500 text-white rounded">
          Sign out
        </button>
        <div className="mt-8 p-4 border rounded">
          <h2 className="text-lg font-bold">Backend Response:</h2>
          <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <p>Not signed in</p>
      <button onClick={() => signIn("keycloak")} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Sign in with Keycloak
      </button>
    </main>
  );
}

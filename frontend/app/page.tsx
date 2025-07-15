'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:3000')
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => setMessage(`Error: ${err.message}`));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Message from Backend:</h1>
        <p className="text-2xl p-4 bg-gray-100 dark:bg-zinc-800 rounded-lg">
          {message}
        </p>
      </div>
    </main>
  );
}

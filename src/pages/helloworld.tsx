import { trpc } from '@/utils/trpc';
import { useState } from 'react';


export default function Home() {
  const [name, setName] = useState('World');
  const helloQuery = trpc.sampleRoute.hello.useQuery({ name });

  return (
  <div className="min-h-screen flex items-center justify-center">
    <main className="p-6 shadow-md rounded max-w-md w-full text-center">
      <h1 className="text-2xl font-bold mb-4">tRPC Demo</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        placeholder="Enter your name"
      />

      <p className="mb-4">Result: {helloQuery.data?.greeting}</p>
    </main>
  </div>
);

}

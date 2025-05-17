import { trpc } from '@/utils/trpc';
import { useState } from 'react';

export default function BatchDemoPage() {
  const [name, setName] = useState('');

  // Fire three queries in parallel
  const helloQuery = trpc.batchSample.hello.useQuery({ name });
  const timeQuery = trpc.batchSample.getTime.useQuery();
  const getNumberQuery = trpc.batchSample.getRandomNumber.useQuery();

  // Determine if any query is loading
  const isLoading = helloQuery.isLoading || timeQuery.isLoading || getNumberQuery.isLoading;

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">tRPC Batching Demo</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
        placeholder="Enter your name"
      />

      {isLoading && <p>Loading...</p>}

      {!isLoading && (
        <>
          <p>{helloQuery.data?.greeting}</p>
          <p>Current time: {timeQuery.data?.time}</p>
          <p>Random number: {getNumberQuery.data?.number}</p>
        </>
      )}
    </main>
  );
}

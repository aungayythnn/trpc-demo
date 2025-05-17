import Link from 'next/link';

export default function Home() {
  return (
  <div className="min-h-screen flex items-center justify-center">
    <main className="p-6 shadow-md rounded max-w-md w-full text-center">
      <h1 className="text-2xl font-bold mb-4">tRPC Demo</h1>

      <p className="mb-2">Click below to apply as a mentor:</p>
      <Link
        href="/application"
        className="text-blue-600 underline hover:text-blue-800"
      >
        Go to Mentor Application
      </Link>
    </main>
  </div>
);

}

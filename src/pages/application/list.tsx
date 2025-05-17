import { trpc } from '@/utils/trpc';
import Link from 'next/link';
import { useState } from 'react';

export default function MentorApplicationsPage() {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = trpc.mentor.listApplications.useQuery({
    page,
    limit,
  });

  const handleNext = () => {
    if (data && page < data.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <main className="max-w-2xl mx-auto p-6 flex justify-center items-center min-h-[200px]">
        <svg
          className="animate-spin h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="max-w-2xl mx-auto p-6 text-red-600">
        <p>Error loading applications. Please try again later.</p>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mentor Applications</h1>

      <ul className="space-y-4">
        {data && data.data.map((app) => (
          <li key={app.id} className="p-4 border rounded shadow-sm">
            <p className="font-semibold">{app.name} ({app.age})</p>
            <p className="text-gray-600">{app.email}</p>
            <p className="mt-2">{app.description}</p>
            <Link href={`/user/${app.id}`} className="text-blue-600 hover:underline">View Application</Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-700">
          Page {page} of {data?.totalPages ?? 1}
        </span>

        <button
          onClick={handleNext}
          disabled={page >= (data?.totalPages ?? 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}

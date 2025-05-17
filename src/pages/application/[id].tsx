import { trpc } from '@/utils/trpc';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ApplicationDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError } = trpc.mentor.getApplicationById.useQuery(
    { id: id as string }, // pass as object
    { enabled: typeof id === 'string' }
  );

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError || !data) return <p className="p-6 text-red-600">Application not found.</p>;

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mentor Application</h1>
      <div className="border p-4 rounded shadow">
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Age:</strong> {data.age}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p className="mt-2"><strong>Description:</strong></p>
        <p>{data.description}</p>
      </div>

      <Link href="/user/application">
        <button className="mt-6 px-4 py-2 border rounded hover:bg-gray-100">
          ← Back to List
        </button>
      </Link>
    </main>
  );
}

'use client';

import { trpc } from '@/utils/trpc';
import { useState } from 'react';

export default function User() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    email: '',
    description: '',
  });

  const submitReq = trpc.mentor.submitApplication.useMutation()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // submit the post with mutation
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mentor Application</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Tell us about yourself"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Application
        </button>
      </form>

      {submitReq.isSuccess && (
        <p className="text-green-600 mt-4">{submitReq.data.success}</p>
      )}

      {submitReq.error && (
        <p className="text-red-600 mt-4">{submitReq.error.message}</p>
      )}
    </main>
  );
}

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/lib/axios.config';

export default function CreateCoursePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const submit = async () => {
    try {
      const res = await axiosInstance.post('/instructor/courses/create', { title, description });
      setMessage('Course created');
      setTitle(''); setDescription('');
      const courseId = res.data.id;
      if (courseId) router.push(`/instructor/course/${courseId}`);
    } catch (err) {
      setMessage('Failed to create course');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Course</h1>
      <div className="mb-3">
        <label className="block mb-1">Title</label>
  <input title="Course title" placeholder="e.g. Intro to Python" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Description</label>
  <textarea title="Course description" placeholder="Short description for the course" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" rows={6}></textarea>
      </div>
      <div>
        <button onClick={submit} className="px-4 py-2 bg-violet-600 text-white rounded">Create</button>
      </div>
      {message && <div className="mt-3">{message}</div>}
    </div>
  );
}

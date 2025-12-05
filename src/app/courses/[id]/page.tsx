"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { axiosInstance } from '@/lib/axios.config';

export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [course, setCourse] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async () => {
      try {
        const res = await axiosInstance.get(`/courses/${id}`);
        if (!mounted) return;
        setCourse(res.data);
      } catch (e) {
        setMsg('Failed to load course.');
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, [id]);

  const enroll = async () => {
    if (!id) return;
    try {
      const res = await axiosInstance.post(`/courses/${id}/enroll`);
      setMsg('Enrolled successfully');
      // Optionally navigate to enrollments or lesson
    } catch (e: any) {
      setMsg(e?.response?.data?.detail || e?.message || 'Enroll failed');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!course) return <div className="p-4">Course not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <div className="text-gray-600 mb-4">{course.description}</div>
      <div className="mb-4">
        <button onClick={enroll} className="px-4 py-2 bg-violet-600 text-white rounded">Enroll</button>
        {msg && <div className="mt-2 text-sm">{msg}</div>}
      </div>

      <h2 className="font-semibold mb-2">Lessons</h2>
      <ul className="space-y-2">
        {(course.lessons || []).map((l: any) => (
          <li key={l.id} className="p-3 border rounded bg-white">
            <a href={`/courses/${id}/lessons/${l.id}`} className="text-violet-600 hover:underline">{l.title}</a>
            <div className="text-sm text-gray-600">{l.content?.slice?.(0, 120) || ''}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

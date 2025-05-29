'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import MoodTracker from '@/components/MoodTracker';
import BudgetTracker from '@/components/BudgetTracker';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export default function CheckInPage() {
  const router = useRouter();
  const { user } = useUser();
  const [hasMoved, setHasMoved] = useState(false);
  const [mood, setMood] = useState<number | null>(null);
  const [spending, setSpending] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          hasMoved,
          mood,
          spending,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save check-in');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Daily Check-in</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Did you move today?
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setHasMoved(true)}
              className={`px-4 py-2 rounded-md ${
                hasMoved
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setHasMoved(false)}
              className={`px-4 py-2 rounded-md ${
                !hasMoved
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              No
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How are you feeling?
          </label>
          <MoodTracker value={mood} onChange={setMood} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How much did you spend today?
          </label>
          <BudgetTracker value={spending} onChange={setSpending} />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Check-in
        </button>
      </form>
    </div>
  );
} 
'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import GoalCard from '@/components/GoalCard';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { Goal } from '@/types';

export default function DashboardPage() {
  const { user } = useUser();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGoals() {
      if (!user) return;

      try {
        const response = await fetch(`/api/goals/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch goals');
        }
        const data = await response.json();
        setGoals(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchGoals();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Welcome back, {user?.firstName}!
      </h1>

      {goals.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            You haven't set any goals yet. Set your first goal to get started!
          </p>
        </div>
      )}
    </div>
  );
} 
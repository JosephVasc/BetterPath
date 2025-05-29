'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

interface Goal {
  type: 'fitness' | 'finance' | 'mental';
  target: number;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const [goals, setGoals] = useState<Goal[]>([
    { type: 'fitness', target: 0 },
    { type: 'finance', target: 0 },
    { type: 'mental', target: 0 },
  ]);

  const handleGoalChange = (index: number, value: number) => {
    setGoals(prev => {
      const newGoals = [...prev];
      newGoals[index] = { ...newGoals[index], target: value };
      return newGoals;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goals,
          userId: user?.id,
        }),
      });

      if (response.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error saving goals:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Let's Set Your Goals
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {goals.map((goal, index) => (
            <div key={goal.type} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 capitalize">
                {goal.type} Goal
              </h3>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Target
                </label>
                <input
                  type="number"
                  value={goal.target}
                  onChange={(e) => handleGoalChange(index, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  required
                />
                <p className="text-sm text-gray-500">
                  {goal.type === 'fitness' && 'Daily steps target'}
                  {goal.type === 'finance' && 'Monthly savings target ($)'}
                  {goal.type === 'mental' && 'Daily meditation minutes'}
                </p>
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Set Goals
          </button>
        </form>
      </div>
    </div>
  );
} 
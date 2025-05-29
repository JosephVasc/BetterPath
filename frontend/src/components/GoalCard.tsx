import { Goal } from '@/types';

interface GoalCardProps {
  goal: Goal;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const progress = (goal.progress / goal.target) * 100;
  
  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'fitness':
        return '🏃‍♂️';
      case 'finance':
        return '💰';
      case 'mental':
        return '🧘‍♂️';
      default:
        return '🎯';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getGoalIcon(goal.type)}</span>
          <h3 className="text-lg font-semibold capitalize">{goal.type}</h3>
        </div>
        <span className="text-sm text-gray-500">
          {goal.progress} / {goal.target}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="mt-2 text-sm text-gray-600">
        {progress.toFixed(1)}% complete
      </div>
    </div>
  );
} 
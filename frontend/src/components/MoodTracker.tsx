import { MoodTrackerProps } from '@/types';

export default function MoodTracker({ value, onChange }: MoodTrackerProps) {
  const moods = [
    { emoji: '😢', label: 'Very Sad' },
    { emoji: '😕', label: 'Sad' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '🙂', label: 'Happy' },
    { emoji: '😄', label: 'Very Happy' },
  ];

  return (
    <div className="flex justify-between">
      {moods.map((mood, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onChange(index + 1)}
          className={`flex flex-col items-center p-2 rounded-lg ${
            value === index + 1
              ? 'bg-blue-100 text-blue-600'
              : 'hover:bg-gray-100'
          }`}
        >
          <span className="text-2xl mb-1">{mood.emoji}</span>
          <span className="text-xs">{mood.label}</span>
        </button>
      ))}
    </div>
  );
} 
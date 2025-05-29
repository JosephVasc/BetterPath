import { BudgetTrackerProps } from '@/types';

export default function BudgetTracker({ value, onChange }: BudgetTrackerProps) {
  return (
    <div className="flex items-center space-x-4">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 10))}
        className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
      >
        -$10
      </button>
      <div className="flex-1">
        <div className="relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => onChange(value + 10)}
        className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
      >
        +$10
      </button>
    </div>
  );
} 
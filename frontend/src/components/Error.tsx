interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-red-600 text-center">
        <p className="font-medium">Something went wrong</p>
        <p className="text-sm mt-1">{message}</p>
      </div>
    </div>
  );
} 
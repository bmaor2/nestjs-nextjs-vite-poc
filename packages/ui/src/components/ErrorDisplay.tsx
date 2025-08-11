interface ErrorDisplayProps {
    message: string;
}

export default function ErrorDisplay({ message }: ErrorDisplayProps) {
    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">Error loading todos: {message}</p>
        </div>
    );
}

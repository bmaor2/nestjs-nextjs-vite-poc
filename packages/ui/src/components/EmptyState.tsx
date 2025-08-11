export default function EmptyState() {
    return (
        <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No todos yet</h3>
            <p className="text-gray-500">Get started by adding your first todo!</p>
        </div>
    );
}

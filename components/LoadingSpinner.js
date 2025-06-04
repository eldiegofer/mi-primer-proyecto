function LoadingSpinner() {
    try {
        return (
            <div className="flex justify-center items-center py-12" data-name="loading-spinner">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    } catch (error) {
        console.error('LoadingSpinner component error:', error);
        reportError(error);
        return null;
    }
}

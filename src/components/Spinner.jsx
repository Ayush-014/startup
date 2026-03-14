export default function Spinner() {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-24">
            <div className="w-8 h-8 rounded-full border border-gray-200 border-t-blue-500 animate-spin" />
            <p className="text-sm text-gray-500">
                Loading Photos...
            </p>
        </div>
    )
}
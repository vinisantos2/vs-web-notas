
export default function Loading({ msg }: { msg: string }) {

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 text-sm">{msg}</p>
            </div>
        </main>
    )
}
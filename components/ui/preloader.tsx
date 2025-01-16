interface PreloaderProps {
    onEnter: () => void;
    progress: number;
}

export default function Preloader({ onEnter, progress }: PreloaderProps) {
    const roundedProgress = Math.round(progress);
    return (
        <div
            className="fixed inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-slate-700 to-slate-900 z-50">
            <div
                className="w-32 h-32 border-4 border-opacity-20 border-fuchsia-800 border-t-fuchsia-800 rounded-full animate-spin animate-pulse"/>
            <div className="mt-6 text-gray-100 text-2xl font-bold font-orbitron">
                Loading... {roundedProgress}%
            </div>
            {progress >= 100 && (
                <button
                    className="mt-6 px-8 py-3 bg-fuchsia-800 text-gray-100 rounded-lg hover:bg-fuchsia-900 transition-colors duration-300 transform hover:scale-105"
                    onClick={onEnter}
                >
                    Enter
                </button>
            )}
        </div>
    );
}
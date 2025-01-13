export default function About() {
    return (
        <section className="h-screen flex items-center justify-center">
            <div className="bg-slate-900 text-gray-50">
                <h1 className="text-fuchsia-500">Welcome to My Portfolio</h1>
                <p className="text-gray-100">This is a modern and vibrant portfolio.</p>
                <button className="bg-fuchsia-600 text-gray-50 hover:bg-fuchsia-700 px-4 py-2 rounded">
                    Get in Touch
                </button>
            </div>
        </section>
    );
}
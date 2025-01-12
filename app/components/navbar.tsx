import Link from "next/link";

export default function Navbar() {
    return (
        <header className="flex items-center fixed z-20 top-0 left-0">
            <Link
                href="/"
                className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
            >
                PRZ
            </Link>
            <nav className="flex text-lg gap-7 font-medium">
                <Link
                    href="/"
                >
                    Home
                </Link>
            </nav>
        </header>
    );
}
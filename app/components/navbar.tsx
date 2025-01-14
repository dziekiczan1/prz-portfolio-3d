import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <header className="flex items-center justify-between fixed z-20 max-w-screen-xl w-full left-1/2 transform -translate-x-1/2 py-4">
            <Link
                href="/"
                className="flex items-center justify-center font-bold gap-4"
            >
                <div className="flex items-center justify-center border border-fuchsia-500 w-10 h-10 rounded-lg">
                    <Image
                        src={`/erzet.webp`}
                        width={32}
                        height={34}
                        alt="eRZet Piotr Rzadkowolski"
                        className="h-3/5 w-auto"
                    />
                </div>
                <p className="uppercase">Piotr Rzadkowolski</p>
            </Link>
            <nav className="flex gap-8">
                <Link
                    href="/"
                >
                    About
                </Link>
                <Link
                    href="/"
                >
                    Projects
                </Link>
                <Link
                    href="/"
                >
                    Resume
                </Link>
                <Link
                    href="/"
                >
                    Contact
                </Link>
            </nav>
        </header>
    );
}
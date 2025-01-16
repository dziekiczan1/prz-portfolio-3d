import Link from "next/link";
import Image from "next/image";
import {HoverBorderGradient} from "@/components/ui/button";

export default function Navbar() {
    return (
        <header className="flex items-center justify-between fixed z-20 w-full py-4 px-8">
            <Link
                href="/"
                className="flex items-center justify-center font-bold gap-4"
            >
                <div className="flex items-center justify-center border border-fuchsia-800 border-2 w-10 h-10 rounded-lg">
                    <Image
                        src={`/erzet.webp`}
                        width={32}
                        height={34}
                        alt="eRZet Piotr Rzadkowolski"
                        className="h-3/5 w-auto"
                    />
                </div>
                <p className="uppercase font-orbitron text-sm">Piotr<br /> Rzadkowolski</p>
            </Link>
            <nav className="flex items-center gap-8">
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
                <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="px-8 py-2 text-m font-medium"
                >
                    Contact
                </HoverBorderGradient>
            </nav>
        </header>
    );
}
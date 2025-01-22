'use client';
import Link from 'next/link';
import Image from 'next/image';
import {HoverBorderGradient} from '@/components/ui/button';
import {useEffect, useState} from "react";
import {navigationMenuData} from "@/constants/navigation";

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, options);

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);

    return (
        <header className="flex items-center justify-between fixed z-20 w-full py-4 px-8">
            <Link
                href="/"
                className="flex items-center justify-center font-bold gap-4"
            >
                <div
                    className="flex items-center justify-center border-2 border-fuchsia-800 w-10 h-10 rounded-lg">
                    <Image
                        src={`/erzet.webp`}
                        width={32}
                        height={34}
                        alt="eRZet Piotr Rzadkowolski"
                        className="h-3/5 w-auto"
                    />
                </div>
                <p className="uppercase font-orbitron text-sm">Piotr<br/> Rzadkowolski</p>
            </Link>
            <nav className="flex items-center gap-8">
                {navigationMenuData.map((item) => (
                    <Link
                        key={item.link}
                        href={item.link}
                        className="relative group"
                    >
                        {item.sectionName}
                        <span
                            className={`absolute left-0 bottom-0 h-0.5 bg-fuchsia-700 transition-all duration-500 transform origin-center ${
                                activeSection === item.name ? 'scale-x-100' : 'scale-x-0'
                            }`}
                            style={{width: '100%'}}
                        />
                    </Link>
                ))}
                <Link href="#contact">
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        className="px-8 py-2 text-m font-medium"
                    >
                        Contact
                    </HoverBorderGradient>
                </Link>
            </nav>
        </header>
    );
}
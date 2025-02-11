'use client';
import Link from 'next/link';
import Image from 'next/image';
import {useEffect, useState} from "react";

import {HoverBorderGradient} from '@/components/ui/button';
import {navigationMenuData} from "@/constants/navigation";
import {MenuButton} from "@/components/ui/menu-button";
import { motion } from 'framer-motion';

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="flex items-center justify-between fixed z-20 w-full py-4 px-4 lg:px-8">
            <Link
                href="/"
                className="flex items-center justify-center font-bold gap-4"
            >
                <div className="flex items-center justify-center border-2 border-fuchsia-800 w-10 h-10 rounded-lg">
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

            <nav className="hidden lg:flex items-center gap-8">
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

            {isMobileMenuOpen && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.2}}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
                    onClick={toggleMobileMenu}
                />
            )}

            <MenuButton
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="z-40 absolute right-4 lg:hidden"
            />

            <div
                className={`fixed inset-y-0 right-0 w-64 bg-slate-800 transform shadow-xl ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 ease-in-out lg:hidden z-30 rounded-l-lg`}
            >
                <nav className="flex flex-col items-start p-6 mt-16 space-y-6">
                    {navigationMenuData.map((item, index) => (
                        <motion.div
                            key={item.link}
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.3, delay: index * 0.1}}
                            className="w-full"
                        >
                            <Link
                                href={item.link}
                                className="w-full group relative py-2 px-4 rounded-lg transition-all duration-300
                                    hover:bg-slate-700 hover:pl-6 hover:shadow-md"
                                onClick={toggleMobileMenu}
                            >
                                <span
                                    className="text-slate-100 text-lg font-medium group-hover:text-fuchsia-400 transition-colors">
                                    {item.sectionName}
                                </span>
                                <div className="absolute left-0 top-1/2 w-1 h-6 bg-fuchsia-500 rounded-full
                                            transform -translate-y-1/2 opacity-0 group-hover:opacity-100
                                            transition-opacity duration-300"/>
                            </Link>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.3, delay: navigationMenuData.length * 0.1}}
                        className="mt-8 w-full px-4"
                    >
                        <Link href="#contact" onClick={toggleMobileMenu} className="block w-full">
                            <HoverBorderGradient
                                containerClassName="rounded-full w-full"
                                as="button"
                                className="w-full px-8 py-3 text-lg font-semibold bg-fuchsia-600
                                        hover:bg-fuchsia-700 transition-all duration-300
                                        hover:scale-105 hover:shadow-lg"
                            >
                                Contact Me
                            </HoverBorderGradient>
                        </Link>
                    </motion.div>
                </nav>
            </div>
        </header>
    );
}
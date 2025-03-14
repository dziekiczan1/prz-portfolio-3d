'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useEffect, useState} from "react";
import {motion} from 'framer-motion';

import {navigationMenuData} from "@/constants/navigation";

import SocialMedia from "@/app/components/social";
import {HoverBorderGradient} from '@/components/ui/button';
import {MenuButton} from "@/components/ui/menu-button";
import {Chevron} from "@/components/ui/chevron";
import {useDeviceType} from "@/app/hooks/useDeviceType";
import {useScrollAnimation} from "@/app/hooks/useScrollAnimation";

export default function Navbar() {
    const scrollOffset = useScrollAnimation();
    const [activeSection, setActiveSection] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const {isMobile} = useDeviceType();

    const [isScrolling, setIsScrolling] = useState<boolean>(false);

    useEffect(() => {
        if (!isMobile) {
            return;
        }
        if (scrollOffset > 0.036) {
            setIsScrolling(true);
        } else {
            setIsScrolling(false);
        }
    }, [scrollOffset, isMobile]);

    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: isMobile ? 0.1 : 0.5,
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
    }, [isMobile]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header
            className={`flex items-center justify-between fixed z-20 w-full py-4 px-4 lg:px-8 `}>
            {isMobile && <div className={`absolute inset-0 -z-10 transition-opacity duration-500 ease-in-out 
            ${isScrolling ? 'bg-gradient-to-br from-slate-700 to-slate-900 opacity-100' : 'bg-transparent opacity-0'}`}>
            </div>}
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

            <div className="flex flex-col items-center z-40 absolute right-4 lg:hidden">
                <MenuButton
                    isOpen={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
                <p className={`text-[8px] uppercase mt-1 text-gray-300 tracking-widest`}>{isMobileMenuOpen ? 'Close' : 'Menu'}</p>
            </div>

            <div
                className={`fixed inset-y-0 right-0 w-4/5 bg-gradient-to-br from-slate-700 to-slate-900 transform ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 ease-in-out lg:hidden z-30 border-l-2 border-slate-700`}
            >
                <nav className="flex flex-col items-start justify-center p-6 mt-16 space-y-6">
                    {navigationMenuData.map((item, index) => (
                        <motion.div
                            key={item.link}
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.3, delay: index * 0.1}}
                            className={`w-full pb-2 border-b ${
                                activeSection === item.name ? 'border-fuchsia-500' : 'border-slate-700'
                            }`}
                        >
                            <Link
                                href={item.link}
                                className={`relative group text-lg font-medium flex items-center gap-2 transition-colors hover:text-fuchsia-500`}
                                onClick={toggleMobileMenu}
                            >
                                <Chevron className={`h-4 w-4 group-hover:text-fuchsia-500 ${
                                    activeSection === item.name ? 'text-fuchsia-500 animate-bounce' : 'text-gray-100'}`}/>
                                {item.sectionName}
                            </Link>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.3, delay: navigationMenuData.length * 0.1}}
                        className="w-full"
                    >
                        <Link href="#contact" onClick={toggleMobileMenu}>
                            <HoverBorderGradient
                                containerClassName="w-full"
                                as="button"
                            >
                                Contact
                            </HoverBorderGradient>
                        </Link>
                    </motion.div>
                    <SocialMedia isMobileNavbar/>
                </nav>
            </div>
        </header>
    );
}
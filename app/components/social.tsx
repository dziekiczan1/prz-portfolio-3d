'use client';

import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {motion} from 'framer-motion';

import {useScrollAnimation} from "@/app/hooks/useScrollAnimation";
import {useDeviceType} from "@/app/hooks/useDeviceType";

import {HoverBorderGradient} from "@/components/ui/button";
import {socialMediaData} from "@/constants/social";
import {SocialMediaProps} from "@/types/social";

export default function SocialMedia({ isMobileNavbar = false }: SocialMediaProps) {
    const scrollOffset = useScrollAnimation();
    const { isMobile } = useDeviceType();
    const [isBarVisible, setIsBarVisible] = useState<boolean>(true);

    useEffect(() => {
        if (!isMobile || isMobileNavbar) {
            return;
        }
        if (scrollOffset > 0.008) {
            setIsBarVisible(false);
        } else {
            setIsBarVisible(true);
        }
    }, [scrollOffset, isMobile, isMobileNavbar]);

    return (
        <motion.div
            className={`fixed left-4 right-4 lg:left-auto lg:right-10 bottom-4 lg:bottom-8 flex justify-between lg:justify-start items-center lg:gap-14 z-10`}
            variants={{
                hidden: {
                    pointerEvents: "none",
                    transition: {
                        delayChildren: 0.2,
                        staggerChildren: 0.1,
                        staggerDirection: -1
                    }
                },
                visible: {
                    pointerEvents: "auto",
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2
                    }
                }
            }}
            initial="visible"
            animate={isBarVisible ? "visible" : "hidden"}
        >
            {socialMediaData.map((social, i) => (
                <motion.div
                    key={social.name}
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            pointerEvents: "auto",
                            transition: {
                                duration: 0.3,
                                delay: i * 0.1
                            }
                        },
                        hidden: {
                            opacity: 0,
                            y: 20,
                            pointerEvents: "none",
                            transition: {
                                duration: 0.3,
                                delay: (socialMediaData.length - i - 1) * 0.1
                            }
                        }
                    }}
                    custom={i}
                >
                    <Link href={social.link} target="_blank" rel="noreferrer">
                        <HoverBorderGradient
                            containerClassName="lg:rotate-45 rounded"
                            as="button"
                            className="p-2.5 lg:p-4 text-m font-medium group"
                        >
                            <Image
                                src={social.logo}
                                alt={social.name}
                                width={24}
                                height={24}
                                className="w-6 h-6 lg:-rotate-45 transition-transform duration-300 group-hover:scale-110"
                            />
                        </HoverBorderGradient>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
}
'use client';

import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";

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
    }, [scrollOffset]);

    return (
        <div className={`${isBarVisible ? 'fixed' : 'hidden'} left-4 right-4 lg:left-auto lg:right-10 bottom-4 lg:bottom-8 flex justify-between lg:justify-start items-center lg:gap-14 z-10`}>
            {socialMediaData.map((social) => (
                <Link href={social.link} target="_blank" rel="noreferrer" key={social.name}>
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
                            className="w-6 h-6 md:-rotate-45 transition-transform duration-300 group-hover:scale-110"
                        />
                    </HoverBorderGradient>
                </Link>
            ))}
        </div>
    );
}
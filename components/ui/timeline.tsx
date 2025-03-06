"use client";
import {
    useScroll,
    useTransform,
    motion,
} from "framer-motion";
import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import Image from "next/image";

import {useDeviceType} from "@/app/hooks/useDeviceType";

interface TimelineEntry {
    title: string;
    companyName: string;
    icon: string;
    link: string;
    date: string;
    points: string[];
}

export const Timeline = ({data}: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const {isMobile} = useDeviceType();

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height + (isMobile ? 100 : 50));
        }
    }, [ref]);

    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start 35%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className="h-full w-full flex items-center justify-center"
            ref={containerRef}
        >
            <div ref={ref} className="relative mx-auto flex flex-col gap-10 pt-0 pb-10 lg:py-10 max-w-4xl">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-end mr-2 lg:mr-24"
                    >
                        <motion.div
                            initial={{opacity: 0, x: -50}}
                            whileInView={{opacity: 1, x: 0}}
                            viewport={{amount: 0.2}}
                            transition={{duration: 0.5, delay: 0.2 * index}}
                            className="relative w-full mx-auto rounded-md lg:rounded-xl border border-[rgba(255,255,255,0.4)]
                          bg-gradient-to-b from-[rgba(51,65,85,0.6)] to-[rgba(15,23,42,0.6)]
                          lg:after:content-[''] lg:after:absolute lg:after:right-[-6px] lg:after:top-6
                          lg:after:border-t-[6px] lg:after:border-t-transparent lg:after:border-b-[6px] lg:after:border-b-transparent
                          lg:after:border-l-[6px] lg:after:border-l-[rgba(255,255,255,0.4)]"
                        >
                            <div className="p-4 lg:p-6">
                                <div className="flex flex-col lg:flex-row lg:justify-between w-full">
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-semibold text-gray-100 mb-1">
                                            {item.companyName}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-300 mb-2">
                                            {item.title}
                                        </p>
                                    </div>
                                    <div className="mb-2 lg:mb-0">
                                        <p className="text-xs font-bold text-gray-400">
                                            {item.date}
                                        </p>
                                    </div>
                                </div>
                                <div className="border-b border-[rgba(255,255,255,0.2)] mb-4"></div>
                                <ul className="list-disc ml-5 space-y-2">
                                    {item.points.map((point, index) => (
                                        <li
                                            key={`experience-point-${index}`}
                                            className="text-sm font-normal text-gray-300"
                                        >
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {isMobile && <Link href={item.link} target="_blank" rel="noopener noreferrer">
                                <div
                                    className="h-16 w-16 absolute top-4 right-2 lg:right-2 rounded-full flex items-center justify-center z-10 bg-[rgba(15,23,42,0.8)]
                                hover:bg-[rgba(15,23,42,0.6)] border border-[rgba(255,255,255,0.2)] shadow-[0_0_10px_2px_rgba(99,102,241,0.3)]
                                hover:shadow-[0_0_10px_2px_rgba(99,102,241,0.9)] transition-all duration-300"
                                >
                                    <div className="relative h-10 w-10">
                                        <Image
                                            src={item.icon}
                                            alt={item.title}
                                            sizes={'40px'}
                                            fill
                                        />
                                    </div>
                                </div>
                            </Link>}
                        </motion.div>

                        {!isMobile && <Link href={item.link} target="_blank" rel="noopener noreferrer">
                            <div
                                className="h-16 w-16 absolute right-2 rounded-full flex items-center justify-center z-10 bg-[rgba(15,23,42,0.8)]
                                hover:bg-[rgba(15,23,42,0.6)] border border-[rgba(255,255,255,0.2)] shadow-[0_0_10px_2px_rgba(99,102,241,0.3)]
                                hover:shadow-[0_0_10px_2px_rgba(99,102,241,0.9)] transition-all duration-300"
                            >
                                <div className="relative h-10 w-10">
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        sizes={'40px'}
                                        fill
                                    />
                                </div>
                            </div>
                        </Link>}
                    </div>
                ))}

                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute -right-1.5 lg:right-[39px] -top-16 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]
                    from-transparent from-[0%] via-gray-400 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-fuchsia-300 via-fuchsia-800 to-transparent from-[0%] via-[10%] rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};
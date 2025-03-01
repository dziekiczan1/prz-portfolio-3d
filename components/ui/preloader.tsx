"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";

import { HoverBorderGradient } from "@/components/ui/button";

interface PreloaderProps {
    onEnter: () => void;
    progress: number;
}

export default function Preloader({ onEnter, progress }: PreloaderProps) {
    const rocketControls = useAnimation();
    const contentControls = useAnimation();

    const roundedProgress = Math.round(progress);
    const status = progress >= 100 ? "success" : "loading";

    const statusConfig = {
        loading: {
            icon: "/icons/spinner.svg",
            text: "Loading...",
            color: "text-gray-300",
            className: "animate-spin"
        },
        success: {
            icon: "/icons/rocket.svg",
            text: "Experience Ready!",
            color: "text-green-500",
            className: ""
        },
    } as const;

    const currentStatus = statusConfig[status];

    const handleLaunch = async () => {
        await Promise.all([
            rocketControls.start({
                x: "100vw",
                y: "-100vh",
                scale: 4,
                rotate: 45,
                opacity: 0,
                transition: {
                    duration: 1,
                    ease: "linear",
                    scale: { duration: 1, ease: "easeOut" }
                }
            }),

            contentControls.start({
                opacity: 0,
                transition: { duration: 0.5 }
            })
        ]);

        onEnter();
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-700 to-slate-900 z-50">
            <div className="flex fixed z-50 w-full py-4 px-4 lg:px-8">
                <Link href="/" className="flex items-center justify-center font-bold gap-4">
                    <div className="flex items-center justify-center border-2 border-fuchsia-800 w-10 h-10 rounded-lg">
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
            </div>
            <motion.div
                className="flex flex-col justify-center items-center h-screen"
                animate={contentControls}
            >
                <div className="mb-8 text-center min-h-[68px]">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="text-4xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-600 bg-clip-text text-transparent"
                    >
                        Welcome to My Portfolio
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="mt-2 text-gray-300 text-sm"
                    >
                        Frontend Developer & Creative Coder
                    </motion.p>
                </div>
                <div className="relative flex items-center justify-center mb-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <motion.div
                            animate={rocketControls}
                            initial={{ y: 0, scale: 1, opacity: 1 }}
                        >
                            <Image
                                src={currentStatus.icon}
                                alt={status}
                                width={96}
                                height={96}
                                className={`${currentStatus.className} ${currentStatus.color}`}
                            />
                        </motion.div>
                        <div className="flex flex-col items-center gap-1">
                            <p className={`${currentStatus.color} text-lg`}>
                                {currentStatus.text}
                            </p>
                            <p className="text-gray-300 text-lg">
                                {roundedProgress}%
                            </p>
                        </div>
                    </motion.div>
                </div>
                <div className="min-h-[46px] min-w-48">
                    {progress >= 100 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="w-full"
                        >
                            <HoverBorderGradient
                                onClick={handleLaunch}
                                containerClassName="hover-border-gradient-button rounded-full w-full"
                                as="button"
                                className="px-8 py-2 text-m font-medium"
                            >
                                Start the Adventure
                            </HoverBorderGradient>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
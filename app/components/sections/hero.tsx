'use client';
import { BlurIn } from "@/components/ui/blur-in";
import { useRef, useEffect } from "react";
import { HoverBorderGradient } from "@/components/ui/button";

export default function Hero() {
    const sectionIds = ['about', 'projects', 'resume', 'contact'];
    const scrollPauseDuration = 1500;
    const scrollDurationBetweenSections = 2500;
    const animationRunning = useRef(false);
    const animationFrameId = useRef<number | null>(null);

    const animateScroll = (targetPosition: number, duration: number): Promise<void> => {
        return new Promise((resolve) => {
            const startPosition = window.scrollY;
            const startTime = performance.now();

            function scrollStep(currentTime: number) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                window.scrollTo(0, startPosition + (targetPosition - startPosition) * progress);

                if (elapsedTime < duration) {
                    animationFrameId.current = requestAnimationFrame(scrollStep);
                } else {
                    resolve();
                }
            }

            animationFrameId.current = requestAnimationFrame(scrollStep);
        });
    };

    const scrollToSectionWithPause = async () => {
        if (animationRunning.current) {
            return;
        }
        animationRunning.current = true;

        try {
            for (const id of sectionIds) {
                const section = document.getElementById(id);
                if (section) {
                    await animateScroll(section.offsetTop, scrollDurationBetweenSections);
                    await new Promise(resolve => setTimeout(resolve, scrollPauseDuration));
                } else {
                    console.error(`Section with id '${id}' not found.`);
                    break;
                }
            }
        } finally {
            animationRunning.current = false;
        }
    };

    const handlePlayAnimation = () => {
        scrollToSectionWithPause();
    };

    const stopAnimation = () => {
        if (animationFrameId.current !== null) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }
        animationRunning.current = false;
    };

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const playButton = document.querySelector('.hover-border-gradient-button');
            if (!playButton?.contains(event.target as Node)) {
                stopAnimation();
            }
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <section className="bg-transparent section-wrapper">
            <BlurIn className="text-4xl lg:text-9xl font-medium tracking-wide mb-8">
                Piotr<br />
                <span className="font-bold text-fuchsia-800">Rzadkowolski</span>
            </BlurIn>
            <div className="relative">
                <HoverBorderGradient
                    onClick={handlePlayAnimation}
                    variant="secondary"
                    containerClassName="hover-border-gradient-button absolute top-8 rounded-full w-max animate-scale-bounce"
                    as="button"
                    className="px-8 py-2 text-m font-medium"
                >
                    Play animation
                </HoverBorderGradient>
            </div>
        </section>
    );
}
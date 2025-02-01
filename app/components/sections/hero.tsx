'use client';
import { BlurIn } from "@/components/ui/blur-in";
import { useRef } from "react";

export default function Hero() {
    const sectionIds = ['about', 'projects', 'resume', 'contact'];
    const scrollPauseDuration = 1500;
    const scrollDurationBetweenSections = 2500;
    const animationRunning = useRef(false);

    const animateScroll = (targetPosition: number, duration: number): Promise<void> => {
        return new Promise((resolve) => {
            const startPosition = window.scrollY;
            const startTime = performance.now();

            function scrollStep(currentTime: number) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                window.scrollTo(0, startPosition + (targetPosition - startPosition) * progress);

                if (elapsedTime < duration) {
                    requestAnimationFrame(scrollStep);
                } else {
                    resolve();
                }
            }

            requestAnimationFrame(scrollStep);
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

    return (
        <section className="bg-transparent h-screen flex items-center justify-center flex-col">
            <BlurIn className="text-9xl font-medium tracking-wide">
                Piotr<br />
                <span className="font-bold text-fuchsia-800">Rzadkowolski</span>
            </BlurIn>
            <button
                onClick={handlePlayAnimation}
                className="mt-8 px-6 py-3 bg-fuchsia-800 text-white rounded-full font-semibold hover:bg-fuchsia-900 focus:ring-2 focus:ring-fuchsia-700 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={animationRunning.current}
            >
                {animationRunning.current ? "Animating..." : "Play Animation to Contact"}
            </button>
        </section>
    );
}
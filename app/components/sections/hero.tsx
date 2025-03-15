'use client';
import { BlurIn } from "@/components/ui/blur-in";
import { useRef, useEffect } from "react";
import { HoverBorderGradient } from "@/components/ui/button";
import { useDeviceType } from "@/app/hooks/useDeviceType";

export default function Hero() {
    const { isMobile } = useDeviceType();
    const sectionIds = ['about', 'projects', 'resume', 'contact'];
    const scrollPauseDuration = isMobile ? 2500 : 1500;
    const scrollDurationBetweenSections = isMobile ? 4500 : 2500;
    const animationRunning = useRef(false);
    const animationFrameId = useRef<number | null>(null);
    const animationButtonRef = useRef<HTMLButtonElement>(null);

    const animateScroll = (targetPosition: number, duration: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (duration <= 0) {
                reject(new Error("Invalid scroll duration"));
                return;
            }

            const startPosition = window.scrollY;
            const headerOffset = isMobile ? 80 : 0;
            const adjustedTargetPosition = targetPosition - headerOffset;
            const startTime = performance.now();

            const scrollStep = (currentTime: number) => {
                if (!animationRunning.current) {
                    cancelAnimationFrame(animationFrameId.current!);
                    reject(new Error("Animation cancelled"));
                    return;
                }

                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                window.scrollTo(0, startPosition + (adjustedTargetPosition - startPosition) * progress);

                if (elapsedTime < duration) {
                    animationFrameId.current = requestAnimationFrame(scrollStep);
                } else {
                    resolve();
                }
            };

            animationFrameId.current = requestAnimationFrame(scrollStep);
        });
    };

    const scrollToSectionWithPause = async () => {
        if (animationRunning.current) return;
        animationRunning.current = true;

        try {
            for (const id of sectionIds) {
                if (!animationRunning.current) break;

                const section = document.getElementById(id);
                if (!section) {
                    console.error(`Section with id '${id}' not found.`);
                    break;
                }

                const duration = id === 'contact'
                    ? (isMobile ? 15000 : 5000)
                    : scrollDurationBetweenSections;

                await animateScroll(section.offsetTop, duration);

                await new Promise<void>((resolve, reject) => {
                    const timeoutId = setTimeout(resolve, scrollPauseDuration);
                    const checkCancel = () => {
                        if (!animationRunning.current) {
                            clearTimeout(timeoutId);
                            reject(new Error("Animation cancelled during pause"));
                        }
                    };
                    const intervalId = setInterval(checkCancel, 100);

                    return () => {
                        clearInterval(intervalId);
                        clearTimeout(timeoutId);
                    };
                });
            }
        } catch (error) {
            console.error("Animation error:", error);
        } finally {
            stopAnimation();
        }
    };

    const handlePlayAnimation = () => {
        scrollToSectionWithPause().catch(error =>
            console.error("Animation failed:", error)
        );
    };

    const stopAnimation = () => {
        animationRunning.current = false;
        if (animationFrameId.current !== null) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }
    };

    useEffect(() => {
        const handleUserInteraction = (event: MouseEvent | TouchEvent) => {
            if (animationButtonRef.current &&
                !animationButtonRef.current.contains(event.target as Node)
            ) {
                stopAnimation();
            }
        };

        window.addEventListener('click', handleUserInteraction);
        window.addEventListener('touchstart', handleUserInteraction);

        return () => {
            window.removeEventListener('click', handleUserInteraction);
            window.removeEventListener('touchstart', handleUserInteraction);
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
                    ref={animationButtonRef}
                >
                    Play animation
                </HoverBorderGradient>
            </div>
        </section>
    );
}
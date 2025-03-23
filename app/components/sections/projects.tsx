"use client";
import Image from "next/image";
import {motion} from "framer-motion";
import {useState} from "react";

import {BlurIn} from "@/components/ui/blur-in";
import {Chevron} from "@/components/ui/chevron";
import {projectsSection} from "@/constants/sections";
import {projectsData} from "@/constants/projects";
import {Project, SlideButtonProps} from "@/types/projects";
import {useDeviceType} from "@/app/hooks/useDeviceType";
import Link from "next/link";
import {HoverBorderGradient} from "@/components/ui/button";

const SLIDE_TRANSITION = {
    type: "spring",
    stiffness: 500,
    damping: 40,
    opacity: {duration: 0.5},
} as const;

interface SlideContainerProps {
    children: React.ReactNode;
    onTouchStart?: (e: React.TouchEvent) => void;
    onTouchEnd?: (e: React.TouchEvent) => void;
}

const SlideButton = ({direction, onClick}: SlideButtonProps) => (
    <button
        onClick={onClick}
        className={`absolute ${direction === "prev" ? "right-14 lg:right-auto lg:-left-16" : "right-0 lg:-right-16"} -bottom-14 lg:bottom-auto lg:top-1/2 transform lg:-translate-y-1/2
      bg-fuchsia-800/20 text-gray-400 p-3 rounded-full hover:bg-fuchsia-800/30
      backdrop-blur-sm border border-fuchsia-800/30 hover:border-fuchsia-800/50 group`}
        aria-label={`${direction} project`}
    >
        {direction === "prev" ? (
            <Chevron className="h-4 lg:h-6 w-4 lg:w-6 group-hover:text-gray-100 transition-colors animate-pulse -rotate-180"/>
        ) : (
            <Chevron className="h-4 lg:h-6 w-4 lg:w-6 group-hover:text-gray-100 transition-colors animate-pulse"/>
        )}
    </button>
);

const TechBadge = ({tech}: { tech: string }) => (
    <span className="px-2 lg:px-3 py-0.5 lg:py-1 bg-gray-700 rounded-full text-xs lg:text-sm text-gray-200">
    {tech}
  </span>
);

const ProjectCard = ({ project }: { project: Project }) => {
    const { isMobile } = useDeviceType();

    return (
        <motion.div
            className="flex flex-col lg:flex-row gap-4 p-4 lg:p-8 h-full"
            initial={{
                opacity: 0,
                y: isMobile ? -20 : 50,
                x: isMobile ? 0 : 0
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                x: 0
            }}
            viewport={{
                amount: 0.2,
                margin: isMobile ? "0px 0px -50px 0px" : "0px"
            }}
            transition={{
                duration: 0.5,
                delay: isMobile ? 0.1 : 0
            }}
        >
            <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-1/2 h-auto lg:h-full overflow-hidden rounded-md lg:rounded-xl border-2
        border-white/40 hover:shadow-[0_0_20px_rgba(159,68,217,0.8)] transition-shadow duration-300 max-h-[400px] lg:max-h-none"
            >
                <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={800}
                    height={500}
                />
            </a>

            <div className="flex flex-col flex-1">
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-gray-100">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                            <TechBadge key={tech} tech={tech}/>
                        ))}
                    </div>
                </div>

                <div className="border-b border-white/20 my-4"/>

                <p className="text-sm font-medium text-gray-300 mb-4 lg:flex-1 overflow-y-auto max-h-[218px] scrollable-description pr-1">
                    {project.description}
                </p>

                <div className="flex flex-col lg:flex-row gap-4 mt-auto">
                    <a href={project.live}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex-1 project-slide-link">
                        <HoverBorderGradient
                            containerClassName="rounded-md"
                            as="button"
                            variant="secondary"
                            className="px-8 py-2 text-m font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-sparkles">
                                <path
                                    d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                                <path d="M5 3v4"/>
                                <path d="M19 17v4"/>
                                <path d="M3 5h4"/>
                                <path d="M17 19h4"/>
                            </svg>
                            <span className="text-sm font-medium text-gray-100 tracking-wide">Live Demo</span>
                        </HoverBorderGradient>
                    </a>

                    <a href={project.github}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex-1 project-slide-link">
                        <HoverBorderGradient
                            containerClassName="rounded-md"
                            as="button"
                            className="px-8 py-2 text-m font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-github">
                                <path
                                    d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                                <path d="M9 18c-4.51 2-5-2-7-2"/>
                            </svg>
                            <span className="text-sm font-medium text-gray-100 tracking-wide">GitHub</span>
                        </HoverBorderGradient>
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const SlideContainer = ({children, onTouchStart, onTouchEnd}: SlideContainerProps) => (
    <div
        className="w-full overflow-hidden glass-card"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
    >
        <motion.div
            className="inline lg:block"
            style={{width: "100%"}}
            initial={{x: 0, opacity: 0.7}}
            animate={{opacity: 1}}
            transition={SLIDE_TRANSITION}
        >
            {children}
        </motion.div>
    </div>
);

const AnimatedDiv = motion.div;

export default function Projects() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

    const handleSlideChange = (direction: "next" | "prev") => {
        setCurrentSlide((prev) => {
            const delta = direction === "next" ? 1 : -1;
            return (prev + delta + projectsData.length) % projectsData.length;
        });
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        setTouchStart({
            x: touch.clientX,
            y: touch.clientY,
        });
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart) return;

        const touch = e.changedTouches[0];
        const endX = touch.clientX;
        const endY = touch.clientY;

        const deltaX = endX - touchStart.x;
        const deltaY = endY - touchStart.y;

        // Check if horizontal swipe and exceeds threshold (50px)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                handleSlideChange("prev");
            } else {
                handleSlideChange("next");
            }
        }

        setTouchStart(null);
    };

    return (
        <section id="projects" className="section-wrapper pb-14 lg:pb-0">
            <div className="relative max-w-5xl mx-auto lg:text-center">
                <BlurIn className="section-heading">
                    {projectsSection.heading}
                </BlurIn>
                <AnimatedDiv
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.4}}
                    className="section-paragraph"
                >
                    {projectsSection.paragraph}
                </AnimatedDiv>
            </div>

            <div className="flex w-full lg:max-w-3xl xl:max-w-5xl relative">
                <SlideContainer
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <AnimatedDiv
                        className="flex"
                        animate={{x: `-${currentSlide * 100}%`}}
                        transition={SLIDE_TRANSITION}
                    >
                        {projectsData.map((project) => (
                            <div
                                key={project.id}
                                className="w-full flex-shrink-0"
                                style={{width: "100%"}}
                            >
                                <ProjectCard project={project}/>
                            </div>
                        ))}
                    </AnimatedDiv>
                </SlideContainer>
                <SlideButton direction="prev" onClick={() => handleSlideChange("prev")}/>
                <SlideButton direction="next" onClick={() => handleSlideChange("next")}/>
            </div>
        </section>
    );
}
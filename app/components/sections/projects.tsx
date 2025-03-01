"use client";
import Image from "next/image";
import {motion} from "framer-motion";
import {useState} from "react";

import {BlurIn} from "@/components/ui/blur-in";
import {Chevron} from "@/components/ui/chevron";
import {projectsSection} from "@/constants/sections";
import {projectsData} from "@/constants/projects";
import {Project, SlideButtonProps} from "@/types/projects";

const SLIDE_TRANSITION = {
    type: "spring",
    stiffness: 500,
    damping: 40,
    opacity: {duration: 0.5},
} as const;

const SlideButton = ({direction, onClick}: SlideButtonProps) => (
    <button
        onClick={onClick}
        className={`absolute ${direction === "prev" ? "right-12 lg:right-auto lg:-left-16" : "right-0 lg:-right-16"} -bottom-10 lg:bottom-auto lg:top-1/2 transform lg:-translate-y-1/2
      bg-fuchsia-800/20 text-gray-400 p-2 lg:p-3 rounded-full hover:bg-fuchsia-800/30
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
    <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200">
    {tech}
  </span>
);

const ProjectCard = ({project}: { project: Project }) => (
    <motion.div
        className="flex gap-8 p-8"
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{amount: 0.2}}
        transition={{duration: 0.5}}
    >
        <div
            className="w-3/5 h-auto overflow-hidden rounded-xl border-2 border-white/40 hover:shadow-[0_0_20px_rgba(159,68,217,0.8)] transition-shadow duration-300">
            <Image
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
                width={800}
                height={500}
            />
        </div>

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

            <p className="text-sm font-medium text-gray-300 mb-4 flex-1">
                {project.description}
            </p>

            <div className="flex gap-4">
                <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                >
                    Live
                </a>
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                >
                    GitHub
                </a>
            </div>
        </div>
    </motion.div>
);

const SlideContainer = ({children}: { children: React.ReactNode }) => (
    <div className="w-full overflow-hidden glass-card">
        <motion.div
            className="flex"
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

    const handleSlideChange = (direction: "next" | "prev") => {
        setCurrentSlide((prev) => {
            const delta = direction === "next" ? 1 : -1;
            return (prev + delta + projectsData.length) % projectsData.length;
        });
    };

    return (
        <section id="projects" className="section-wrapper mb-10 lg:mb-0">
            <div className="relative max-w-5xl mx-auto text-center">
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

            <div className="flex w-full max-w-5xl relative">
                <SlideContainer>
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
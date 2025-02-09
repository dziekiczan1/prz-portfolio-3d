import {motion} from "framer-motion";
import {useState} from "react";

import {BlurIn} from "@/components/ui/blur-in";

import {projectsSection} from "@/constants/sections";
import {projectsData} from "@/constants/projects";
import {HoverBorderGradient} from "@/components/ui/button";

export default function Projects() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleSlideChange = (direction: "next" | "prev") => {
        let newSlide = direction === "next" ? currentSlide + 1 : currentSlide - 1;

        if (newSlide >= projects.length) {
            newSlide = 0;
        } else if (newSlide < 0) {
            newSlide = projects.length - 1;
        }

        setCurrentSlide(newSlide);
    };

    return (
        <section id="projects" className="h-screen flex flex-col items-center justify-center">
            <div className="max-w-5xl mx-auto">
                <BlurIn className="text-fuchsia-500 text-4xl font-semibold text-center mb-8">
                    {projectsSection.heading}
                </BlurIn>
                <motion.p initial={{opacity: 0, y: 20}}
                          whileInView={{opacity: 1, y: 0}}
                          transition={{duration: 0.6, delay: 0.4}}
                          className="text-lg font-normal text-gray-300 leading-relaxed mb-8">
                    {projectsSection.paragraph}
                </motion.p>
            </div>
            <div className="flex w-full max-w-5xl relative">
                <div className="relative w-full overflow-hidden mx-auto rounded-xl border border-[rgba(255,255,255,0.4)]
                          bg-gradient-to-b from-[rgba(51,65,85,0.6)] to-[rgba(15,23,42,0.6)]
                          shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm">
                    <motion.div
                        className="flex"
                        style={{width: "100%"}}
                        initial={{x: 0, opacity: 0.7}}
                        animate={{
                            x: -currentSlide * 100 + "%",
                            opacity: 1,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 40,
                            opacity: {duration: 0.5},
                        }}
                    >
                        {projectsData.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="flex gap-8 p-8"
                                style={{
                                    width: "100%",
                                    flexShrink: 0,
                                }}
                                initial={{opacity: 0, y: 50}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{amount: 0.2}}
                                transition={{duration: 0.5, delay: 0.2 * index}}
                            >

                                <div
                                    className="w-3/5 h-auto overflow-hidden rounded-xl border-2 border-[rgba(255,255,255,0.4)]
                                    hover:shadow-[0_0_25px_rgba(159,68,217,0.8)] transition-shadow duration-300">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-lg font-semibold text-gray-100 mb-1">
                                            {project.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.stack.map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200"
                                                >
                                            {tech}
                                        </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-b border-[rgba(255,255,255,0.2)] mb-4"></div>

                                    <p className="text-sm font-medium text-gray-300 mb-2">
                                        {project.description}
                                    </p>

                                    <div className="flex gap-4">
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-fuchsia-800 hover:bg-fuchsia-900 rounded-lg text-gray-100 transition-colors"
                                        >
                                            Live
                                        </a>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg text-gray-100 transition-colors"
                                        >
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>


                </div>
                <button
                    onClick={() => handleSlideChange("prev")}
                    className="absolute -left-16 top-1/2 transform -translate-y-1/2 bg-fuchsia-800/20 text-gray-400 p-3 rounded-full hover:bg-fuchsia-800/30 transition-colors backdrop-blur-sm border border-fuchsia-800/30 hover:border-fuchsia-800/50 group"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 group-hover:text-gray-100 transition-colors animate-pulse"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                <button
                    onClick={() => handleSlideChange("next")}
                    className="animte-pulse absolute -right-16 top-1/2 transform -translate-y-1/2 bg-fuchsia-800/20 text-gray-400 p-3 rounded-full hover:bg-fuchsia-800/30 transition-colors backdrop-blur-sm border border-fuchsia-800/30 hover:border-fuchsia-800/50 group"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 group-hover:text-gray-100 transition-colors animate-pulse"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </section>
    );
}
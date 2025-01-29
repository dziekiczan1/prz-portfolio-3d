import { motion } from "framer-motion";
import { useState } from "react";

export const projects = [
    {
        id: 0,
        title: "Project 1",
        image: "/projects/proj1.webp",
        link: "#",
        description: "A modern web application built with React and Tailwind CSS.",
        stack: ["React", "Tailwind CSS", "Framer Motion"],
        live: "https://example.com",
        github: "https://github.com/example/project1",
    },
    {
        id: 1,
        title: "Project 2",
        image: "/projects/proj2.webp",
        link: "#",
        description: "An interactive dashboard for data visualization.",
        stack: ["React", "Tailwind CSS", "Framer Motion"],
        live: "https://example.com",
        github: "https://github.com/example/project2",
    },
    {
        id: 2,
        title: "Project 3",
        image: "/projects/proj3.webp",
        link: "#",
        description: "A portfolio website showcasing my projects and skills.",
        stack: ["React", "Tailwind CSS", "Framer Motion"],
        live: "https://example.com",
        github: "https://github.com/example/project3",
    },
];

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
            <h1 className="mb-8 text-4xl font-bold text-white">Projects</h1>
            <div className="flex w-full max-w-5xl">
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
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="flex flex-col items-center p-8"
                                onClick={() => setCurrentSlide(index)}
                                style={{
                                    width: "100%",
                                    flexShrink: 0,
                                }}
                            >
                                <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                                <p className="text-center mb-6">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.stack.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                    >
                                        Live
                                    </a>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg transition-colors"
                                    >
                                        GitHub
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <button
                        onClick={() => handleSlideChange("prev")}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
                    >
                        {"<"}
                    </button>

                    <button
                        onClick={() => handleSlideChange("next")}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
                    >
                        {">"}
                    </button>
                </div>
            </div>
        </section>
    );
}
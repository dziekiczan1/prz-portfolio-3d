import { motion } from "framer-motion";
import { useState } from "react";

export const projects = [
    { id: 0, title: "Project 1", image: "/projects/proj1.webp", link: "#" },
    { id: 1, title: "Project 2", image: "/projects/proj2.webp", link: "#" },
    { id: 2, title: "Project 3", image: "/projects/proj3.webp", link: "#" },
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
            <h1 className="mb-4 text-2xl font-bold">Projects</h1>
            <div className="flex w-full max-w-5xl">
                <div className="relative w-full overflow-hidden">
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
                                className="relative p-8 w-full mx-auto rounded-xl border border-[rgba(255,255,255,0.4)]
                          bg-gradient-to-b from-[rgba(51,65,85,0.6)] to-[rgba(15,23,42,0.6)]
                          shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm"
                                onClick={() => {
                                    setCurrentSlide(index);
                                }}
                                style={{
                                    width: "100%",
                                    flexShrink: 0,
                                }}
                            >
                                <p>{project.title}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <button
                        onClick={() => handleSlideChange("prev")}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full"
                    >
                        {"<"}
                    </button>

                    <button
                        onClick={() => handleSlideChange("next")}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full"
                    >
                        {">"}
                    </button>
                </div>
                </div>
        </section>
);
}

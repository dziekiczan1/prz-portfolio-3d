import { useProjectContext } from "@/context/project-context";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Projects() {
    const { activeProject, setActiveProject } = useProjectContext();
    const [currentSlide, setCurrentSlide] = useState(0);

    const projects = [
        { id: 0, title: "Project 1", image: "/project1.png" },
        { id: 1, title: "Project 2", image: "/project2.png" },
        { id: 2, title: "Project 3", image: "/project3.png" },
    ];

    const handleSlideChange = (direction: "next" | "prev") => {
        let newSlide = direction === "next" ? currentSlide + 1 : currentSlide - 1;

        if (newSlide >= projects.length) {
            newSlide = 0;
        } else if (newSlide < 0) {
            newSlide = projects.length - 1;
        }

        setCurrentSlide(newSlide);
        setActiveProject(newSlide);
    };

    return (
        <section id="projects" className="h-screen flex flex-col items-center justify-center">
            <h1 className="mb-4 text-2xl font-bold">Projects</h1>
            <div className="relative w-full max-w-full overflow-hidden">
                <motion.div
                    className="flex"
                    style={{ width: "100%" }}
                    initial={{ x: 0, opacity: 0.7 }}
                    animate={{
                        x: -currentSlide * 100 + "%",
                        opacity: 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 40,
                        opacity: { duration: 0.5 },
                    }}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={`cursor-pointer p-4 border rounded-lg shadow-lg ${
                                activeProject === index ? "border-fuchsia-600" : "border-gray-400"
                            }`}
                            onClick={() => {
                                setActiveProject(index);
                                setCurrentSlide(index);
                            }}
                            style={{
                                width: "100%",
                                flexShrink: 0,
                            }}
                        >
                            <p>{project.title}</p>
                            <img src={project.image} alt={project.title} className="w-full h-auto" />
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
        </section>
    );
}

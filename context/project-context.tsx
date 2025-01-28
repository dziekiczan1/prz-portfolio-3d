'use client';
import { createContext, useContext, useState } from "react";

interface ProjectContextProps {
    activeProject: number;
    setActiveProject: (id: number) => void;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeProject, setActiveProject] = useState(0);

    return (
        <ProjectContext.Provider value={{ activeProject, setActiveProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjectContext = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProjectContext must be used within a ProjectProvider");
    }
    return context;
};

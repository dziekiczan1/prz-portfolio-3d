export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    stack: string[];
    live?: string;
    github: string;
}

export interface SlideButtonProps {
    direction: "prev" | "next";
    onClick: () => void;
}

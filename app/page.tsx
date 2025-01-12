"use client";
import {Canvas} from "@react-three/fiber";
import Experience from "./components/sections/experience";
import {Suspense, useEffect, useRef, useState} from "react";
import Loader from "@/app/components/loader";
import About from "@/app/components/sections/about";
import Hero from "@/app/components/sections/hero";
import Projects from "@/app/components/sections/projects";
import Contact from "@/app/components/sections/contact";
import {useProgress} from "@react-three/drei";

export default function Home() {
    const {progress} = useProgress();
    const isLoaded = progress === 100;

    const sectionRefs = {
        about: useRef<HTMLDivElement>(null),
        projects: useRef<HTMLDivElement>(null),
        contact: useRef<HTMLDivElement>(null),
    };

    const [currentSection, setCurrentSection] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                let newSection: string | null = null;
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        newSection = entry.target.getAttribute("data-section") || null;
                    }
                });

                if (newSection !== null) {
                    setCurrentSection(newSection);
                } else {
                    setCurrentSection('hero');
                }
            },
            { threshold: 0.5 }
        );

        Object.values(sectionRefs).forEach((ref) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
            Object.values(sectionRefs).forEach((ref) => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, []);

    return (
        <>
            <div className="sticky w-full h-screen top-0 left-0 z-0">
                <Suspense fallback={<Loader/>}>
                    {isLoaded &&
                        <div className="absolute top-0 left-0 w-full h-screen z-10">
                            <Hero />
                        </div>
                    }
                    <Canvas
                        shadows
                        camera={{
                            fov: 75,
                            near: 0.1,
                            far: 200,
                            position: [-1.25, 0, 5]
                        }}
                    >
                        <Experience currentSection={currentSection}/>
                    </Canvas>
                </Suspense>
            </div>
            <div className="relative z-10">
                <div ref={sectionRefs.about} data-section="about">
                    <About/>
                </div>
                <div ref={sectionRefs.projects} data-section="projects">
                    <Projects/>
                </div>
                <div ref={sectionRefs.contact} data-section="contact">
                    <Contact/>
                </div>
            </div>
        </>
    );
}

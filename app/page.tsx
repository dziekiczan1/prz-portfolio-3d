"use client";
import {Canvas} from "@react-three/fiber";
import Experience from "./components/sections/experience";
import {Suspense} from "react";
import Loader from "@/app/components/loader";
import About from "@/app/components/sections/about";
import Hero from "@/app/components/sections/hero";
import Projects from "@/app/components/sections/projects";
import Contact from "@/app/components/sections/contact";
import {useProgress} from "@react-three/drei";

export default function Home() {
    const {progress} = useProgress();
    const isLoaded = progress === 100;
    return (
        <>
            <div className="sticky w-full h-screen top-0 left-0 z-0">
                <Suspense fallback={<Loader/>}>
                    {isLoaded &&
                        <div className="absolute top-0 left-0 w-full h-screen z-10">
                            <Hero/>
                        </div>
                    }
                    <Canvas
                        shadows
                        camera={{
                            fov: 75,
                            near: 0.1,
                            far: 200,
                            position: [0, 0, 5]
                        }}
                    >
                        <Experience/>
                    </Canvas>
                </Suspense>
            </div>
            <div className="relative z-10">
                <About/>
                <Projects/>
                <Contact/>
            </div>
        </>
    );
}

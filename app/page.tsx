"use client";
import {Canvas} from "@react-three/fiber";
import {Suspense} from "react";
import {Scroll, ScrollControls} from "@react-three/drei";

import Loader from "@/app/components/loader";
import Hero from "@/app/components/sections/hero";
import About from "@/app/components/sections/about";
import Experience from "./components/sections/experience";
import Projects from "@/app/components/sections/projects";
import Contact from "@/app/components/sections/contact";

export default function Home() {

    // Scroll container styles
    const scrollContainerStyles: React.CSSProperties = {
        width: '100%',
        overflow: 'hidden',
    }
    return (
        <div className="relative w-full h-screen">
            <div className="fixed inset-0 z-0">
                <Suspense fallback={<Loader/>}>
                    <Canvas
                        shadows
                        camera={{
                            fov: 75,
                            near: 0.1,
                            far: 200,
                            position: [0, 0, 5],
                            zoom: 110
                        }}
                        orthographic
                    >
                        <ScrollControls pages={4}>
                            <Experience/>
                            <Scroll html style={scrollContainerStyles}>
                                <div className="scroll-container">
                                    <Hero/>
                                    <About/>
                                    <Projects/>
                                    <Contact/>
                                </div>
                            </Scroll>
                        </ScrollControls>
                    </Canvas>
                </Suspense>
            </div>
        </div>
    );
}

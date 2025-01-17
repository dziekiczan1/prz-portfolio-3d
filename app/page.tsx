'use client';
import {lazy, Suspense, useEffect, useState} from "react";
import {Canvas, useThree} from "@react-three/fiber";
import {Scroll, ScrollControls, useProgress} from "@react-three/drei";
import * as THREE from "three";
import Preloader from "@/components/ui/preloader";

const Hero = lazy(() => import("@/app/components/sections/hero"));
const About = lazy(() => import("@/app/components/sections/about"));
const Experience = lazy(() => import("@/app/components/sections/experience"));
const Projects = lazy(() => import("@/app/components/sections/projects"));
const Contact = lazy(() => import("@/app/components/sections/contact"));

const TOTAL_ASSETS = 39;

function CameraSetup() {
    const {size, camera} = useThree();
    const aspect = size.width / size.height;

    useEffect(() => {
        if (camera instanceof THREE.OrthographicCamera) {
            camera.left = -1 * aspect;
            camera.right = 1 * aspect;
            camera.bottom = -1;
            camera.top = 1;
            camera.updateProjectionMatrix();
        }
    }, [size, camera, aspect]);

    return null;
}

export default function Home() {
    const [showPreloader, setShowPreloader] = useState(true);

    const {loaded, total} = useProgress();
    const progress = total > 0 ? (loaded / TOTAL_ASSETS) * 100 : 0;

    return (
        <div className="relative w-full h-screen">
            {/*{showPreloader && <Preloader onEnter={() => setShowPreloader(false)} progress={progress}/>}*/}

            <div className="fixed inset-0 z-0">
                <Suspense fallback={null}>
                    <Canvas
                        shadows
                        camera={{
                            near: 0.1,
                            far: 200,
                            position: [0, 0, 5],
                            zoom: 1,
                        }}
                        dpr={[1, 2]}
                        orthographic
                    >
                        <CameraSetup/>
                        <ScrollControls pages={4}>
                            <Experience/>
                            <Scroll html style={{width: '100%', overflow: 'hidden'}}>
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
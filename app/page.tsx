'use client';
import { lazy, Suspense, useEffect, useState } from "react";
import {Canvas, useThree} from "@react-three/fiber";
import {useProgress} from "@react-three/drei";
import * as THREE from "three";
import Preloader from "@/components/ui/preloader";
import Resume from "@/app/components/sections/resume";
import GridPattern from "@/components/ui/grid-pattern";
import {cn} from "@/lib/utils";

const Hero = lazy(() => import("@/app/components/sections/hero"));
const About = lazy(() => import("@/app/components/sections/about"));
const Experience = lazy(() => import("@/app/components/sections/experience"));
const Projects = lazy(() => import("@/app/components/sections/projects"));
const Contact = lazy(() => import("@/app/components/sections/contact"));

const TOTAL_ASSETS = 44;

function CameraSetup() {
    const { size, camera } = useThree();
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
    const { loaded, total } = useProgress();
    const progress = total > 0 ? Math.min((loaded / TOTAL_ASSETS) * 100, 100) : 0;

    return (
        <div className="relative w-full h-screen min-h-screen">
            {showPreloader && <Preloader onEnter={() => setShowPreloader(false)} progress={progress} />}

            <div className="fixed inset-0 -bottom-8 lg:bottom-0 z-0 bg-gradient-to-br from-slate-700 to-slate-900">
                <GridPattern
                    width={20}
                    height={20}
                    x={-1}
                    y={-1}
                    className={cn(
                        "[mask-image:linear-gradient(to_top_left,white,transparent,transparent)] ",
                    )}
                />
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
                        <Experience/>
                    </Canvas>
                </Suspense>
            </div>

            <div className="relative z-10">
                <Hero/>
                <About/>
                <Projects/>
                <Resume/>
                <Contact/>
            </div>
        </div>
    );
}
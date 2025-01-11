"use client";
import {Canvas} from "@react-three/fiber";
import Experience from "./components/sections/experience";
import {Suspense} from "react";
import Loader from "@/app/components/loader";

export default function Home() {
    return (
        <Suspense fallback={<Loader />}>
            <Canvas
                shadows
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [13, -3, -5]
                }}
            >
                <Experience/>
            </Canvas>
        </Suspense>
    );
}

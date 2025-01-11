"use client";
import {Canvas} from "@react-three/fiber";
import Experience from "./components/sections/experience";

export default function Home() {
    return (
        <Canvas shadows>
            <Experience/>
        </Canvas>
    );
}

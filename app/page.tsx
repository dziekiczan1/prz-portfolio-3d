"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/sections/experience";

export default function Home() {
  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [2.5, 4, 6],
      }}
    >
      <Experience />
    </Canvas>
  );
}

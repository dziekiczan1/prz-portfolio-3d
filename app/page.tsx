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
        position: [0, 0, 5],
      }}
    >
      <Experience />
    </Canvas>
  );
}

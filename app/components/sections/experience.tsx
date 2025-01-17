"use client";
import {Perf} from "r3f-perf";
import {useRef} from "react";
import {useControls} from "leva";
import {DirectionalLight} from "three";
import * as THREE from "three";

import Wobble from "@/app/components/models/wobble";
import Technology from "@/app/components/models/technology";
import Developer from "@/app/components/models/developer";

// Gradient Background Component
function GradientBackground() {
    const meshRef = useRef<THREE.Mesh>(null);

    // Vertex shader (simple full-screen plane)
    const vertexShader = `
        void main() {
            gl_Position = vec4(position, 1.0);
        }
    `;

    // Fragment shader (gradient effect)
    const fragmentShader = `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;

        void main() {
            vec3 color = mix(color1, color2, vUv.y);
            gl_FragColor = vec4(color, 1.0);
        }
    `;

    return (
        <mesh ref={meshRef} position={[0, 0, -10]} scale={[1, 1, 1]}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    color1: { value: new THREE.Color("#1E293B") },
                    color2: { value: new THREE.Color("#0F172A") },
                }}
            />
        </mesh>
    );
}

export default function Experience() {
    // Performance monitor
    const {perfVisible} = useControls('performance', {
        perfVisible: false,
    });

    // Light helper
    const lightRef = useRef<DirectionalLight>(null);
    // useHelper(lightRef as React.MutableRefObject<DirectionalLight>, DirectionalLightHelper, 1, "red");

    return (
        <>
            {perfVisible && <Perf position="top-left"/>}
            <directionalLight
                ref={lightRef}
                color={'#ffffff'}
                position={[-1, 2, 2]}
                intensity={3}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={15}
                shadow-normalBias={0.05}
            />
            <ambientLight intensity={0.5}/>
            <GradientBackground />
            <Wobble/>
            <Developer />
            <Technology/>
        </>
    );
}

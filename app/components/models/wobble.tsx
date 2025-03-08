import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import CustomShaderMaterial from "three-custom-shader-material";

import wobbleVertexShader from "@/app/shaders/wobble/vertex.glsl";
import wobbleFragmentShader from "@/app/shaders/wobble/fragment.glsl";
import {useScrollAnimation} from "@/app/hooks/useScrollAnimation";
import {useDeviceType} from "@/app/hooks/useDeviceType";

export default function Wobble() {
    const scrollOffset = useScrollAnimation();
    const wobbleRef = useRef<THREE.Mesh>(null);
    const {isMobile} = useDeviceType();

    // Create icosahedron geometry
    const icosahedronGeometry = useMemo(() => {
        const icosahedronGeometry = new THREE.IcosahedronGeometry(2.5, 50);
        const mergedIcosahedronGeometry = mergeVertices(icosahedronGeometry);
        mergedIcosahedronGeometry.computeTangents();
        return mergedIcosahedronGeometry;
    }, []);

    // Shader uniforms
    const uniforms = useMemo(() => ({
        uTime: new THREE.Uniform(0),
        uPositionFrequency: new THREE.Uniform(0.5),
        uTimeFrequency: new THREE.Uniform(0.4),
        uStrength: new THREE.Uniform(0.3),
        uWarpPositionFrequency: new THREE.Uniform(0.38),
        uWarpTimeFrequency: new THREE.Uniform(0.12),
        uWarpStrength: new THREE.Uniform(1.7),
        uColorA: new THREE.Uniform(new THREE.Color("#844adb")),
        uColorB: new THREE.Uniform(new THREE.Color("#4b0079")),
    }), []);

    useFrame((state) => {
        const elapsedTime = state.clock.getElapsedTime();
        // Time uniform update
        uniforms.uTime.value = elapsedTime;

        if (wobbleRef.current) {
            // Wobble section positions
            const sections = [
                {
                    start: 0, end: 0.025,
                    position: isMobile ? new THREE.Vector3(-0.25, 0.65, 0) : new THREE.Vector3(-1, 0, 0),
                    scale: isMobile ? 0.05 : 0.35
                }, // Hero
                {
                    start: 0.025, end: 0.20,
                    position: isMobile ? new THREE.Vector3(0.1, -0.2, 0) : new THREE.Vector3(0.2, 0, 0),
                    scale: isMobile ? 0.6 : 0.8
                }, // About
                {
                    start: 0.20, end: 0.78,
                    position: isMobile ? new THREE.Vector3(0.8, 0.3, 0) : new THREE.Vector3(2, 0.5, 0),
                    scale: isMobile ? 0.2 : 0.28
                }, // Projects
                {
                    start: 0.78, end: 0.95,
                    position: isMobile ? new THREE.Vector3(-1.2, 0, 0) : new THREE.Vector3(-2, 0, 0),
                    scale: isMobile ? 0.4 : 0.45
                }, // Resume
                {
                    start: 0.95, end: 1,
                    position: isMobile ? new THREE.Vector3(0, -0.15, 0) : new THREE.Vector3(0, 0, 0),
                    scale: isMobile ? 0.32 : 0.38
                }, // Contact
            ];

            // Find current and next section
            let currentSection = sections[0];
            let nextSection = sections[0];

            for (let i = 0; i < sections.length; i++) {
                if (scrollOffset >= sections[i].start && scrollOffset <= sections[i].end) {
                    currentSection = sections[i];
                    nextSection = sections[i + 1] || currentSection;
                    break;
                }
            }

            // Calculate normalized offset
            const sectionRange = currentSection.end - currentSection.start;
            const normalizedOffset = (scrollOffset - currentSection.start) / sectionRange;

            // Interpolate position and scale
            const targetPosition = new THREE.Vector3().lerpVectors(
                currentSection.position,
                nextSection.position,
                normalizedOffset
            );

            const targetScale = THREE.MathUtils.lerp(
                currentSection.scale,
                nextSection.scale,
                normalizedOffset
            );

            // Smoothly animate position and scale
            wobbleRef.current.position.lerp(targetPosition, 0.1);
            wobbleRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                0.1
            );
        }
    });

    return (
        <mesh ref={wobbleRef} geometry={icosahedronGeometry} castShadow receiveShadow>
            <CustomShaderMaterial
                baseMaterial={THREE.MeshPhysicalMaterial}
                vertexShader={wobbleVertexShader}
                fragmentShader={wobbleFragmentShader}
                uniforms={uniforms}
                wireframe={false}
                metalness={0}
                roughness={0.5}
                color={"#ffffff"}
                transmission={0}
                ior={1.5}
                thickness={1.5}
                silent={true}
            />
            <CustomShaderMaterial
                baseMaterial={THREE.MeshDepthMaterial}
                vertexShader={wobbleVertexShader}
                uniforms={uniforms}
                depthPacking={THREE.RGBADepthPacking}
                attach="customDepthMaterial"
                silent={true}
            />
        </mesh>
    );
}
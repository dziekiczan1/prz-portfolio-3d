import {useEffect, useMemo, useRef} from "react";
import {useControls} from "leva";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {mergeVertices} from "three/addons/utils/BufferGeometryUtils.js";
import CustomShaderMaterial from "three-custom-shader-material";
import gsap from "gsap";

import wobbleVertexShader from "@/app/shaders/wobble/vertex.glsl";
import wobbleFragmentShader from "@/app/shaders/wobble/fragment.glsl";

export default function Wobble({currentSection}: { currentSection: string | null }) {
    const icosahedronRef = useRef<THREE.Mesh>(null);
    const icosahedronGeometry = useMemo(() => {
        const icosahedronGeometry = new THREE.IcosahedronGeometry(2.5, 50);
        const mergedIcosahedronGeometry = mergeVertices(icosahedronGeometry);
        mergedIcosahedronGeometry.computeTangents();
        return mergedIcosahedronGeometry;
    }, []);

    useEffect(() => {
        if (!icosahedronRef.current) return;

        const animations: Record<string, () => void> = {
            hero: () => {
                if (icosahedronRef.current) {
                    gsap.to(icosahedronRef.current.position, {x: 0, y: 0, z: 0, duration: 1, ease: "power2.inOut"});
                    gsap.to(icosahedronRef.current.rotation, {x: 0, y: 0, z: 0, duration: 1, ease: "power2.inOut"});
                }
            },
            about: () => {
                if (icosahedronRef.current) {
                    gsap.to(icosahedronRef.current.position, {x: 1.3, y: -1, z: 0.8, duration: 1, ease: "power2.inOut"});
                    gsap.to(icosahedronRef.current.rotation, {
                        x: 0,
                        y: Math.PI / 2,
                        z: 0,
                        duration: 1,
                        ease: "power2.inOut"
                    });
                }
            },
            projects: () => {
                if (icosahedronRef.current) {
                    gsap.to(icosahedronRef.current.position, {x: -2, y: 0, z: 0, duration: 1, ease: "power2.inOut"});
                }
            },
            contact: () => {
                if (icosahedronRef.current) {
                    gsap.to(icosahedronRef.current.position, {x: 2, y: 0, z: 0, duration: 1, ease: "power2.inOut"});
                }
            },
        };

        if (currentSection && animations[currentSection]) {
            animations[currentSection]();
        }
    }, [currentSection]);

    const options = useMemo(() => {
        return {
            positionFrequency: {value: 0.5, min: 0, max: 2, step: 0.01},
            timeFrequency: {value: 0.4, min: 0, max: 2, step: 0.01},
            strength: {value: 0.3, min: 0, max: 1, step: 0.01},
            warpPositionFrequency: {value: 0.38, min: 0, max: 2, step: 0.01},
            warpTimeFrequency: {value: 0.12, min: 0, max: 2, step: 0.01},
            warpStrength: {value: 1.7, min: 0, max: 5, step: 0.01},
            colorA: {value: '#844adb'},
            colorB: {value: '#4b0079'},
        }
    }, []);

    const {
        positionFrequency,
        timeFrequency,
        strength,
        warpPositionFrequency,
        warpTimeFrequency,
        warpStrength,
        colorA,
        colorB
    } = useControls('sphere', options);

    const uniforms = useMemo(() => ({
        uTime: new THREE.Uniform(0),
        uPositionFrequency: new THREE.Uniform(positionFrequency),
        uTimeFrequency: new THREE.Uniform(timeFrequency),
        uStrength: new THREE.Uniform(strength),
        uWarpPositionFrequency: new THREE.Uniform(warpPositionFrequency),
        uWarpTimeFrequency: new THREE.Uniform(warpTimeFrequency),
        uWarpStrength: new THREE.Uniform(warpStrength),
        uColorA: new THREE.Uniform(new THREE.Color(colorA)),
        uColorB: new THREE.Uniform(new THREE.Color(colorB)),
    }), [positionFrequency, timeFrequency, strength, warpPositionFrequency, warpTimeFrequency, warpStrength, colorA, colorB]);

    useFrame((state) => {
        const elapsedTime = state.clock.getElapsedTime();
        uniforms.uTime.value = elapsedTime;
    });

    return (
        <mesh scale={0.5} ref={icosahedronRef} geometry={icosahedronGeometry} castShadow receiveShadow>
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
                transparent={true}
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
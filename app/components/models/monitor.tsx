import React, {useRef} from 'react'
import {useGLTF} from '@react-three/drei'
import {Float} from "@react-three/drei";
import * as THREE from "three";
import {GLTF} from "three-stdlib";
import {useFrame} from "@react-three/fiber";
import {useScrollAnimation} from "@/app/hooks/useScrollAnimation";

interface MonitorGLTF extends GLTF {
    nodes: {
        [key: string]: THREE.Object3D | THREE.Mesh | THREE.SkinnedMesh;
        Object_4: THREE.Mesh;
        Object_5: THREE.Mesh;
        Object_7: THREE.Mesh;
        Object_9: THREE.Mesh;
    };
    materials: {
        [key: string]: THREE.Material;
        Display: THREE.Material;
        Main: THREE.Material;
        Stand: THREE.Material;
        Main_MAt: THREE.Material;
    };
}

export default function Monitor() {
    const { nodes, materials } = useGLTF('./models/monitor.glb') as MonitorGLTF;

    const monitorRef = useRef<THREE.Group>(null!);

    // Get scroll offset
    const scrollOffset = useScrollAnimation();

    useFrame(() => {
        if (monitorRef.current) {
            const scrollStart = 0.32; // Monitor starts appearing
            const scrollEndAppear = 0.41; // Monitor fully visible
            const scrollEndDisappear = 0.56; // Monitor fully disappeared

            let normalizedOffset;

            if (scrollOffset < scrollStart) {
                // Before the monitor starts appearing
                normalizedOffset = 0;
            } else if (scrollOffset >= scrollStart && scrollOffset <= scrollEndAppear) {
                // Monitor is appearing (scale and opacity from 0 to 1)
                normalizedOffset = (scrollOffset - scrollStart) / (scrollEndAppear - scrollStart);
            } else if (scrollOffset > scrollEndAppear && scrollOffset <= scrollEndDisappear) {
                // Monitor is disappearing (scale and opacity from 1 to 0)
                normalizedOffset = 1 - (scrollOffset - scrollEndAppear) / (scrollEndDisappear - scrollEndAppear);
            } else {
                // After the monitor has fully disappeared
                normalizedOffset = 0;
            }

            normalizedOffset = Math.max(0, Math.min(1, normalizedOffset));

            // Animate position on the X axis
            const originX = -3; // Starting X position
            const finalX = -1; // Final X position (adjust as needed)
            const targetX = originX + (finalX - originX) * normalizedOffset;
            monitorRef.current.position.x = targetX;

            // Animate scale
            const targetScale = 0.35 * normalizedOffset; // Scale from 0 to 0.35
            monitorRef.current.scale.set(targetScale, targetScale, targetScale);

            // Animate opacity for all materials
            Object.values(materials).forEach((material) => {
                if (material instanceof THREE.MeshStandardMaterial) {
                    material.transparent = true;
                    material.opacity = normalizedOffset;
                }
            });
        }
    });

    return (
        <Float>
            <group ref={monitorRef} dispose={null} scale={0.35} rotation={[0, 0.4, 0]}>
                <group position={[0, -0.055, 0.027]}>
                    <mesh geometry={nodes.Object_4.geometry} material={materials.Display}/>
                    <mesh geometry={nodes.Object_5.geometry} material={materials.Main}/>
                </group>
                <mesh
                    geometry={nodes.Object_7.geometry}
                    material={materials.Stand}
                    position={[0, -0.055, 0.027]}
                    rotation={[-1.571, 0, 0]}
                    scale={0.272}
                />
                <mesh geometry={nodes.Object_9.geometry} material={materials.Main_MAt}/>
            </group>
        </Float>
    )
}

useGLTF.preload('./models/monitor.glb')

import {Decal, Float, useTexture} from "@react-three/drei";
import {useMemo, useRef} from "react";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import {technologiesData} from "@/constants/technologies";
import {useScrollAnimation} from "@/app/hooks/useScrollAnimation";

export default function Technology() {
    // Load textures
    const textures = useTexture(
        technologiesData.map((data) => data.texturePath)
    );

    // Create sphere geometry and material
    const {geometry, material} = useMemo(() => {
        const geometry = new THREE.SphereGeometry(1, 20, 20);
        const material = new THREE.MeshStandardMaterial({
            color: "white",
            emissive: "#3b51c1",
            emissiveIntensity: 0.3,
            toneMapped: false,
            transparent: true,
            opacity: 0,
        });
        return {geometry, material};
    }, []);

    // Refs for spheres and decal materials
    const sphereRefs = useRef<(THREE.Mesh | null)[]>([]);
    const decalMaterialRefs = useRef<(THREE.MeshBasicMaterial | null)[]>([]);

    // Get scroll offset
    const scrollOffset = useScrollAnimation();

    // Animate spheres based on scroll offset
    useFrame(() => {
        sphereRefs.current.forEach((mesh, index) => {
            const decalMaterial = decalMaterialRefs.current[index];
            const { originPosition, finalPosition, scale: maxScale } = technologiesData[index];

            if (mesh && decalMaterial) {
                const scrollStart = 0.10; // Sphere start appearing
                const scrollEndAppear = 0.33; // Sphere start disappearing
                const scrollEndDisappear = 0.6; // Sphere fully disappeared

                let normalizedOffset;

                if (scrollOffset < scrollStart) {
                    // Before the sphere starts appearing
                    normalizedOffset = 0;
                } else if (scrollOffset >= scrollStart && scrollOffset <= scrollEndAppear) {
                    // Sphere is appearing (scale from 0 to maxScale)
                    normalizedOffset = (scrollOffset - scrollStart) / (scrollEndAppear - scrollStart);
                } else if (scrollOffset > scrollEndAppear && scrollOffset <= scrollEndDisappear) {
                    // Sphere is disappearing (scale from maxScale to 0)
                    normalizedOffset = 1 - (scrollOffset - scrollEndAppear) / (scrollEndDisappear - scrollEndAppear);
                } else {
                    // After the sphere has fully disappeared
                    normalizedOffset = 0;
                }

                normalizedOffset = Math.max(0, Math.min(1, normalizedOffset));

                // Animate position, scale, and opacity
                mesh.position.lerp(
                    new THREE.Vector3(
                        originPosition[0] + (finalPosition[0] - originPosition[0]) * normalizedOffset,
                        originPosition[1] + (finalPosition[1] - originPosition[1]) * normalizedOffset,
                        originPosition[2] + (finalPosition[2] - originPosition[2]) * normalizedOffset
                    ),
                    0.1
                );

                // Animate scale
                const targetScale = normalizedOffset * maxScale;
                mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

                // Animate opacity
                (mesh.material as THREE.MeshStandardMaterial).opacity = normalizedOffset;
                decalMaterial.opacity = normalizedOffset;
            }
        });
    });

    return (
        <>
            {technologiesData.map((data, index) => (
                <Float key={index} rotationIntensity={0.15} floatIntensity={0.002} floatingRange={[-0.002,0.002]}>
                    <mesh
                        ref={(el) => {
                            sphereRefs.current[index] = el as THREE.Mesh | null;
                        }}
                        geometry={geometry}
                        material={material}
                        position={data.originPosition}
                        castShadow
                        scale={data.scale}
                        rotation={data.rotation}
                    >
                        <Decal
                            position={data.decalPosition || [0, 0, 1]}
                            rotation={[0, 0, 0]}
                            scale={data.decalScale || 1.5}
                        >
                            <meshBasicMaterial
                                ref={(el) => {
                                    decalMaterialRefs.current[index] = el as THREE.MeshBasicMaterial | null;
                                }}
                                map={textures[index]}
                                transparent={true}
                                opacity={0}
                                polygonOffset
                                polygonOffsetFactor={-1}
                            />
                        </Decal>
                    </mesh>
                </Float>
            ))}
        </>
    );
}
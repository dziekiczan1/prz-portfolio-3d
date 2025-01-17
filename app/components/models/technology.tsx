import {Decal, Float, useScroll, useTexture} from "@react-three/drei";
import {useMemo, useRef} from "react";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import {technologyData} from "@/constants/technology";

export default function Technology() {
    // Load textures
    const textures = useTexture(
        technologyData.map((data) => data.texturePath)
    );

    // Create sphere geometry and material
    const {geometry, material} = useMemo(() => {
        const geometry = new THREE.SphereGeometry(1, 50, 50);
        const material = new THREE.MeshStandardMaterial({
            color: "#e281ec",
            emissive: "#3b0147",
            emissiveIntensity: 0.2,
            toneMapped: false,
            transparent: true,
            opacity: 0,
        });
        return {geometry, material};
    }, []);

    // Refs for spheres and decal materials
    const sphereRefs = useRef<(THREE.Mesh | null)[]>([]);
    const decalMaterialRefs = useRef<(THREE.MeshBasicMaterial | null)[]>([]);

    // Scroll animation
    const scroll = useScroll();
    useFrame(() => {
        const {offset} = scroll;

        sphereRefs.current.forEach((mesh, index) => {
            const decalMaterial = decalMaterialRefs.current[index];
            const {originPosition, finalPosition, scale: maxScale} = technologyData[index];

            if (mesh && decalMaterial) {
                const scrollStart = 0.10; // Sphere start appearing
                const scrollEndAppear = 0.33; // Sphere start disappearing
                const scrollEndDisappear = 0.6; // Sphere fully disappeared

                let normalizedOffset;

                if (offset < scrollStart) {
                    // Before the sphere starts appearing
                    normalizedOffset = 0;
                } else if (offset >= scrollStart && offset <= scrollEndAppear) {
                    // Sphere is appearing (scale from 0 to maxScale)
                    normalizedOffset = (offset - scrollStart) / (scrollEndAppear - scrollStart);
                } else if (offset > scrollEndAppear && offset <= scrollEndDisappear) {
                    // Sphere is disappearing (scale from maxScale to 0)
                    normalizedOffset = 1 - (offset - scrollEndAppear) / (scrollEndDisappear - scrollEndAppear);
                } else {
                    // After the sphere has fully disappeared
                    normalizedOffset = 0;
                }

                normalizedOffset = Math.max(0, Math.min(1, normalizedOffset));

                // Animate position, scale and opacity
                mesh.position.lerp(
                    new THREE.Vector3(
                        originPosition[0] + (finalPosition[0] - originPosition[0]) * normalizedOffset,
                        originPosition[1] + (finalPosition[1] - originPosition[1]) * normalizedOffset,
                        originPosition[2] + (finalPosition[2] - originPosition[2]) * normalizedOffset
                    ),
                    0.1
                );
                // Animate scale (respecting maxScale from technologyData)
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
            {technologyData.map((data, index) => (
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
                            position={[0, 0, 1]}
                            rotation={[0, 0, 0]}
                            scale={1.5}
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
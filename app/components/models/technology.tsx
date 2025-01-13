import { Decal, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function Technology({ visible }: { visible: boolean }) {
    const magentoTexture = useTexture('./magento.svg');

    // Sphere data
    const sphereData: {
        originPosition: [number, number, number];
        finalPosition: [number, number, number];
        scale: number;
        rotation: [number, number, number];
    }[] = [
        { originPosition: [-5, 0, 0], finalPosition: [0, 0, 0], scale: 1, rotation: [0, 0, 0] },
        { originPosition: [5, -2, 0], finalPosition: [2, 0, 0], scale: 1, rotation: [0.3, 0.2, 0] },
        { originPosition: [0, 5, -2], finalPosition: [-2, 0, 0], scale: 1, rotation: [0, Math.PI / 4, 0] },
    ];

    // Create geometry and material once
    const { geometry, material } = useMemo(() => {
        const geometry = new THREE.SphereGeometry(1, 50, 50);
        const material = new THREE.MeshStandardMaterial({
            color: "white",
            emissive: "white",
            emissiveIntensity: 0.2,
            toneMapped: false,
            transparent: true,
            opacity: 0, // Start invisible
        });
        return { geometry, material };
    }, []);

    // References to sphere meshes
    const sphereRefs = useRef<(THREE.Mesh | null)[]>([]);
    const decalMaterialRefs = useRef<(THREE.MeshBasicMaterial | null)[]>([]);

    // Animate on `visible` change
    useEffect(() => {
        if (!sphereRefs.current || !decalMaterialRefs.current) return;

        sphereRefs.current.forEach((mesh, index) => {
            const decalMaterial = decalMaterialRefs.current[index];

            if (mesh && decalMaterial) {
                const { originPosition, finalPosition } = sphereData[index];

                if (visible) {
                    // Animate to final position, scale up, and fade in
                    gsap.fromTo(
                        mesh.position,
                        { x: originPosition[0], y: originPosition[1], z: originPosition[2] },
                        { x: finalPosition[0], y: finalPosition[1], z: finalPosition[2], duration: 1.5, ease: "power2.out" }
                    );
                    gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: "power2.out" });  // Scale up
                    gsap.to(mesh.material, { opacity: 1, duration: 1, ease: "power2.out" });
                    gsap.to(decalMaterial, { opacity: 1, duration: 1, ease: "power2.out" });
                } else {
                    // Animate back to origin position, scale down, and fade out
                    gsap.to(mesh.position, {
                        x: originPosition[0],
                        y: originPosition[1],
                        z: originPosition[2],
                        duration: 1.5,
                        ease: "power2.in",
                    });
                    gsap.to(mesh.scale, { x: 0, y: 0, z: 0, duration: 1.5, ease: "power2.in" });  // Scale down
                    gsap.to(mesh.material, { opacity: 0, duration: 1.5, ease: "power2.in" });
                    gsap.to(decalMaterial, { opacity: 0, duration: 1.5, ease: "power2.in" });
                }
            }
        });
    }, [visible]);

    return (
        <>
            {sphereData.map((data, index) => (
                <mesh
                    key={index}
                    ref={(el) => {
                        (sphereRefs.current[index] = el as THREE.Mesh | null);
                    }}
                    geometry={geometry}
                    material={material}
                    position={data.finalPosition}
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
                                (decalMaterialRefs.current[index] = el as THREE.MeshBasicMaterial | null);
                            }}
                            map={magentoTexture}
                            transparent={true}
                            opacity={0} // Start invisible
                            polygonOffset
                            polygonOffsetFactor={-1}
                        />
                    </Decal>
                </mesh>
            ))}
        </>
    );
}

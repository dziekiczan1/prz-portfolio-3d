import {Decal, Float, useTexture} from "@react-three/drei";
import {useMemo, useRef} from "react";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import {technologiesData} from "@/constants/technologies";
import {useScrollAnimation} from "@/app/hooks/useScrollAnimation";
import {useDeviceType} from "@/app/hooks/useDeviceType";

export default function Technology() {
    // Filter technologies
    const { isMobile } = useDeviceType();

    const filteredTechnologies = isMobile
        ? technologiesData.filter((tech) => tech.showOnMobile === true)
        : technologiesData;

    // Load textures
    const textures = useTexture(
        filteredTechnologies.map((data) => data.texturePath)
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

    // Time accumulator for oscillation
    const time = useRef(0);

    // Animate spheres based on scroll offset
    useFrame((state, delta) => {
        time.current += delta;

        sphereRefs.current.forEach((mesh, index) => {
            const decalMaterial = decalMaterialRefs.current[index];
            const techData = filteredTechnologies[index];

            if (mesh && decalMaterial) {
                const scrollStart = isMobile ? 0.009 : 0.085; // Sphere start appearing
                const scrollEndAppear = isMobile ? 0.04 : 0.20; // Sphere start disappearing
                const scrollEndDisappear = isMobile ? 0.1 : 0.31; // Sphere fully disappeared

                let normalizedOffset;

                if (scrollOffset < scrollStart) {
                    normalizedOffset = 0;
                } else if (scrollOffset >= scrollStart && scrollOffset <= scrollEndAppear) {
                    normalizedOffset = (scrollOffset - scrollStart) / (scrollEndAppear - scrollStart);
                } else if (scrollOffset > scrollEndAppear && scrollOffset <= scrollEndDisappear) {
                    normalizedOffset = 1 - (scrollOffset - scrollEndAppear) / (scrollEndDisappear - scrollEndAppear);
                } else {
                    normalizedOffset = 0;
                }

                normalizedOffset = Math.max(0, Math.min(1, normalizedOffset));

                // Use mobile-specific values if they exist, otherwise fallback to desktop values
                const originPosition = isMobile && techData.mobileOriginPosition ? techData.mobileOriginPosition : techData.originPosition;
                const finalPosition = isMobile && techData.mobileFinalPosition ? techData.mobileFinalPosition : techData.finalPosition;
                const maxScale = isMobile && techData.mobileScale ? techData.mobileScale : techData.scale;

                // Animate position
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

                // Add a small rotation on the Y-axis and X-axis
                const rotationAmplitude = 0.1; // Oscillates between -0.1 and 0.1
                const rotationSpeed = 1;

                mesh.rotation.y = Math.sin(time.current * rotationSpeed) * rotationAmplitude;
                mesh.rotation.x = Math.sin(time.current * rotationSpeed + Math.PI / 2) * rotationAmplitude;
            }
        });
    });

    return (
        <>
            {filteredTechnologies.map((data, index) => (
                <Float
                    key={index}
                    rotationIntensity={isMobile ? 0.05 : 0.15}
                    floatIntensity={isMobile ? 0.01 : 0.002}
                    floatingRange={isMobile ? [-0.01, 0.01] : [-0.002, 0.002]}
                >
                    <mesh
                        ref={(el) => {
                            sphereRefs.current[index] = el as THREE.Mesh | null;
                        }}
                        geometry={geometry}
                        material={material}
                        position={isMobile && data.mobileOriginPosition ? data.mobileOriginPosition : data.originPosition}
                        castShadow
                        scale={isMobile && data.mobileScale ? data.mobileScale : data.scale}
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
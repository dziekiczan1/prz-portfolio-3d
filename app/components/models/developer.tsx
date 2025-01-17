import {useEffect, useRef} from 'react';
import {useAnimations, useFBX, useGLTF, useScroll} from '@react-three/drei';
import {GroupProps, useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import {GLTF} from 'three-stdlib';
import {off} from "next/dist/client/components/react-dev-overlay/pages/bus";

interface CustomGLTF extends GLTF {
    nodes: {
        [key: string]: THREE.Object3D | THREE.Mesh | THREE.SkinnedMesh;
        Hips: THREE.Object3D;
        EyeLeft: THREE.SkinnedMesh;
        EyeRight: THREE.SkinnedMesh;
        Wolf3D_Head: THREE.SkinnedMesh;
        Wolf3D_Teeth: THREE.SkinnedMesh;
        Wolf3D_Hair: THREE.SkinnedMesh;
        Wolf3D_Outfit_Top: THREE.SkinnedMesh;
        Wolf3D_Outfit_Bottom: THREE.SkinnedMesh;
        Wolf3D_Outfit_Footwear: THREE.SkinnedMesh;
        Wolf3D_Body: THREE.SkinnedMesh;
    };
    materials: {
        [key: string]: THREE.Material;
        Wolf3D_Eye: THREE.Material;
        Wolf3D_Skin: THREE.Material;
        Wolf3D_Teeth: THREE.Material;
        Wolf3D_Hair: THREE.Material;
        Wolf3D_Outfit_Top: THREE.Material;
        Wolf3D_Outfit_Bottom: THREE.Material;
        Wolf3D_Outfit_Footwear: THREE.Material;
        Wolf3D_Body: THREE.Material;
    };
}

export default function Developer(props: GroupProps) {
    const group = useRef<THREE.Group>(null);
    const {...restProps} = props;
    const {nodes, materials} = useGLTF('./models/developer.glb') as CustomGLTF;

    const {animations: phoneAnimation} = useFBX('./models/phone.fbx');
    const {animations: sittingAnimation} = useFBX('./models/sitting.fbx');
    const {animations: pointingAnimation} = useFBX('./models/pointing.fbx');
    phoneAnimation[0].name = 'phone';
    sittingAnimation[0].name = 'sitting';
    pointingAnimation[0].name = 'pointing';

    const {actions} = useAnimations(
        [phoneAnimation[0], sittingAnimation[0], pointingAnimation[0]],
        group
    );

    const scroll = useScroll();
    useFrame(() => {
        const {offset} = scroll;

        const scrollStartFade = 0.01; // Model is visible from offset 0.01
        const scrollShowStart = 0.45; // Model reappears at offset 0.45
        const scrollShowEnd = 0.55; // Model is fully visible by offset 0.55
        const scrollPointStart = 0.45; // Start pointing animation at offset 0.45
        const scrollPhoneStart = 0.75; // Start phone animation at offset 0.75

        let positionY = -0.1; // Initial Y position
        let positionX = 0.5; // Initial X position
        let positionZ = -4; // Initial Z position
        let animationProgress = 0;
        let scale = 1; // Initial scale
        let opacity = 1; // Initial opacity

        // Handle visibility, scale, and opacity based on scroll offset
        if (offset >= scrollStartFade && offset < scrollShowStart) {
            opacity = 0;
            scale = 0;
        } else if (offset >= scrollShowStart && offset <= scrollShowEnd) {
            // Model reappears between 0.45 and 0.55
            animationProgress = (offset - scrollShowStart) / (scrollShowEnd - scrollShowStart);
            positionY = -1; // Final Y position
            positionX = 1.5; // Final X position
            positionZ = 2; // Final Z position
            scale = lerp(0, 0.6, animationProgress); // Scale up from 0 to 0.6
            opacity = lerp(0, 1, animationProgress); // Fade in from 0 to 1
        } else if (offset > scrollShowEnd) {
            // Model is fully visible after 0.55
            scale = 0.6;
            opacity = 1;
            positionY = -1;
            positionX = 1.5;
            positionZ = 2;
        }

        // Smoothly transition to pointing animation at offset 0.45
        if (offset >= scrollPointStart && actions.pointing && actions.sitting) {
            actions.sitting.stop(); // Stop sitting animation
            actions.pointing.play(); // Start pointing animation
            actions.pointing.weight = 1; // Fully transition to pointing animation
        }

        // Switch to phone animation at offset 0.75
        if (offset >= scrollPhoneStart && actions.phone && actions.pointing) {
            actions.pointing.stop(); // Stop pointing animation
            actions.phone.play(); // Start phone animation
            actions.phone.weight = 1; // Fully transition to phone animation
        }

        // Reverse logic for scrolling back
        if (offset < scrollPhoneStart && actions.pointing && actions.phone) {
            actions.phone.stop(); // Stop phone animation
            actions.pointing.play(); // Resume pointing animation
            actions.pointing.weight = 1; // Fully transition to pointing animation
        }

        if (offset < scrollPointStart && actions.sitting && actions.pointing) {
            actions.pointing.stop(); // Stop pointing animation
            actions.sitting.play(); // Resume sitting animation
            actions.sitting.weight = 1; // Fully transition to sitting animation
        }

        // Apply position, scale, and opacity to the model
        if (group.current) {
            group.current.scale.set(scale, scale, scale);
            group.current.position.y = positionY;
            group.current.position.x = positionX;
            group.current.position.z = positionZ;

            // Traverse the group and apply opacity to all meshes
            group.current.traverse((child) => {
                if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
                    const mesh = child as THREE.Mesh;
                    if (Array.isArray(mesh.material)) {
                        // Handle case where material is an array
                        mesh.material.forEach((material) => {
                            if ((material as THREE.Material).opacity !== undefined) {
                                (material as THREE.Material).opacity = opacity;
                                (material as THREE.Material).transparent = true;
                            }
                        });
                    } else {
                        // Handle case where material is a single material
                        if ((mesh.material as THREE.Material).opacity !== undefined) {
                            (mesh.material as THREE.Material).opacity = opacity;
                            (mesh.material as THREE.Material).transparent = true;
                        }
                    }
                }
            });
        }
    });

    // Linear interpolation function
    function lerp(start: number, end: number, t: number) {
        return start * (1 - t) + end * t;
    }

    return (
        <group {...restProps} ref={group} position={[0.5, -0.1, 8]} rotation={[-Math.PI / 2, 0, 0]}>
            <primitive object={nodes.Hips}/>
            <skinnedMesh
                name="EyeLeft"
                geometry={nodes.EyeLeft.geometry}
                material={materials.Wolf3D_Eye}
                skeleton={nodes.EyeLeft.skeleton}
                morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
                morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
            />
            <skinnedMesh
                name="EyeRight"
                geometry={nodes.EyeRight.geometry}
                material={materials.Wolf3D_Eye}
                skeleton={nodes.EyeRight.skeleton}
                morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
                morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
            />
            <skinnedMesh
                name="Wolf3D_Head"
                geometry={nodes.Wolf3D_Head.geometry}
                material={materials.Wolf3D_Skin}
                skeleton={nodes.Wolf3D_Head.skeleton}
                morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
                morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
            />
            <skinnedMesh
                name="Wolf3D_Teeth"
                geometry={nodes.Wolf3D_Teeth.geometry}
                material={materials.Wolf3D_Teeth}
                skeleton={nodes.Wolf3D_Teeth.skeleton}
                morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
                morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Hair.geometry}
                material={materials.Wolf3D_Hair}
                skeleton={nodes.Wolf3D_Hair.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Top.geometry}
                material={materials.Wolf3D_Outfit_Top}
                skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
                material={materials.Wolf3D_Outfit_Bottom}
                skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
                material={materials.Wolf3D_Outfit_Footwear}
                skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Body.geometry}
                material={materials.Wolf3D_Body}
                skeleton={nodes.Wolf3D_Body.skeleton}
            />
        </group>
    );
}

useGLTF.preload('./models/developer.glb');
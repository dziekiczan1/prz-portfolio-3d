import {useEffect, useMemo, useRef, useState} from 'react';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

interface DeveloperGLTF extends GLTF {
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

export default function Developer() {
    const group = useRef<THREE.Group>(null);
    const { nodes, materials } = useGLTF('./models/developer.glb') as DeveloperGLTF;

    const { animations: phoneAnimation } = useFBX('./models/phone.fbx');
    const { animations: sittingAnimation } = useFBX('./models/sitting.fbx');
    const { animations: pointingAnimation } = useFBX('./models/pointing.fbx');

    const animations = useMemo(() => {
        phoneAnimation[0].name = 'phone';
        sittingAnimation[0].name = 'sitting';
        pointingAnimation[0].name = 'pointing';

        return [phoneAnimation[0], sittingAnimation[0], pointingAnimation[0]];
    }, [phoneAnimation, sittingAnimation, pointingAnimation]);

    const { actions } = useAnimations(animations, group);
    const actionsRef = useRef(actions);
    const previousAnimationRef = useRef<string>('');

    useEffect(() => {
        if (actions) {
            actionsRef.current = actions;
        }
    }, [actions]);

    const scrollOffset = useScrollAnimation();
    const [currentAnimation, setCurrentAnimation] = useState<string>('sitting');

    useEffect(() => {
        if (scrollOffset < 0.45) {
            setCurrentAnimation('sitting');
        } else if (scrollOffset < 0.75) {
            setCurrentAnimation('pointing');
        } else {
            setCurrentAnimation('phone');
        }
    }, [scrollOffset]);

    useEffect(() => {
        const currentAction = actionsRef.current[currentAnimation];
        const previousAction = actionsRef.current[previousAnimationRef.current];

        if (previousAction) {
            if (
                (previousAnimationRef.current === 'pointing' && currentAnimation === 'phone') ||
                (previousAnimationRef.current === 'phone' && currentAnimation === 'pointing')
            ) {
                // Fade out the previous animation (only between 'pointing' and 'phone')
                previousAction.fadeOut(0.5); // 0.5 seconds fade-out duration
            } else {
                // Immediately stop and reset the previous animation (for 'sitting' or other cases)
                previousAction.stop().reset();
            }
        }

        if (currentAction) {
            if (currentAnimation === 'sitting') {
                // Play 'sitting' immediately without fade-in
                currentAction.reset().play();
            } else if (
                (previousAnimationRef.current === 'pointing' && currentAnimation === 'phone') ||
                (previousAnimationRef.current === 'phone' && currentAnimation === 'pointing')
            ) {
                // Fade in the new animation (only between 'pointing' and 'phone')
                currentAction
                    .reset() // Reset the animation to the beginning
                    .fadeIn(0.5) // 0.5 seconds fade-in duration
                    .play();
            } else {
                // Play other animations immediately without fade-in
                currentAction.reset().play();
            }
        }

        // Update the previous animation ref
        previousAnimationRef.current = currentAnimation;

        // Cleanup function to stop the animation when the component unmounts or the animation changes
        return () => {
            if (previousAction) {
                if (
                    (previousAnimationRef.current === 'pointing' && currentAnimation === 'phone') ||
                    (previousAnimationRef.current === 'phone' && currentAnimation === 'pointing')
                ) {
                    // Stop the previous animation after fade-out
                    previousAction.stop();
                } else {
                    // Stop and reset other animations immediately
                    previousAction.stop().reset();
                }
            }
        };
    }, [currentAnimation]);

    useFrame(() => {
        const scrollStartFade = 0.01;
        const scrollShowStart = 0.45;
        const scrollShowEnd = 0.55;

        let positionY = -0.1;
        let positionX = 0.5;
        let positionZ = -4;
        let animationProgress = 0;
        let scale = 1;
        let opacity = 1;

        if (scrollOffset >= scrollStartFade && scrollOffset < scrollShowStart) {
            opacity = 0;
            scale = 0;
        } else if (scrollOffset >= scrollShowStart && scrollOffset <= scrollShowEnd) {
            animationProgress = (scrollOffset - scrollShowStart) / (scrollShowEnd - scrollShowStart);
            positionY = -1;
            positionX = 1.5;
            positionZ = 2;
            scale = lerp(0, 0.6, animationProgress);
            opacity = lerp(0, 1, animationProgress);
        } else if (scrollOffset > scrollShowEnd) {
            scale = 0.6;
            opacity = 1;
            positionY = -1;
            positionX = 1.5;
            positionZ = 2;
        }

        if (group.current) {
            group.current.scale.set(scale, scale, scale);
            group.current.position.y = positionY;
            group.current.position.x = positionX;
            group.current.position.z = positionZ;

            group.current.traverse((child) => {
                if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
                    const mesh = child as THREE.Mesh;
                    if (Array.isArray(mesh.material)) {
                        mesh.material.forEach((material) => {
                            if ((material as THREE.Material).opacity !== undefined) {
                                (material as THREE.Material).opacity = opacity;
                                (material as THREE.Material).transparent = true;
                            }
                        });
                    } else {
                        if ((mesh.material as THREE.Material).opacity !== undefined) {
                            (mesh.material as THREE.Material).opacity = opacity;
                            (mesh.material as THREE.Material).transparent = true;
                        }
                    }
                }
            });
        }
    });

    function lerp(start: number, end: number, t: number) {
        return start * (1 - t) + end * t;
    }

    return (
        <group ref={group} position={[0.5, -0.1, 8]} rotation={[-Math.PI / 2, 0, 0]}>
            <primitive object={nodes.Hips} />
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
import { useEffect, useRef } from 'react';
import { useAnimations, useFBX, useGLTF, useScroll } from '@react-three/drei';
import { GroupProps, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';
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

export default function Developer(props: GroupProps & { animationName?: string }) {
    const group = useRef<THREE.Group>(null);
    const { animationName = 'sitting', ...restProps } = props;
    const { nodes, materials } = useGLTF('./models/developer.glb') as CustomGLTF;

    const { animations: phoneAnimation } = useFBX('./models/phone.fbx');
    const { animations: wavingAnimation } = useFBX('./models/waving.fbx');
    const { animations: walkingAnimation } = useFBX('./models/walking.fbx');
    const { animations: standingAnimation } = useFBX('./models/standing.fbx');
    const { animations: sittingAnimation } = useFBX('./models/sitting.fbx');
    const { animations: pointingAnimation } = useFBX('./models/pointing.fbx');
    phoneAnimation[0].name = 'phone';
    wavingAnimation[0].name = 'waving';
    sittingAnimation[0].name = 'sitting';
    pointingAnimation[0].name = 'pointing';
    walkingAnimation[0].name = 'walking';
    standingAnimation[0].name = 'standing';

    const { actions } = useAnimations(
        [phoneAnimation[0], wavingAnimation[0], sittingAnimation[0], pointingAnimation[0], walkingAnimation[0], standingAnimation[0]],
        group
    );

    const scroll = useScroll();
    useFrame(() => {
        const { offset } = scroll;

        const scrollStartFade = 0.01;
        const scrollEndFade = 0.1;
        const scrollWaveStart = 0.1; // Start waving at offset 0.1
        const scrollPointStart = 0.5; // Start pointing at offset 0.5
        const scrollPhoneStart = 0.85; // Start phone animation at offset 0.75

        let positionY = -0.075;
        let positionX = 0.5; // Initial X position
        let positionZ = -4; // Initial Z position
        let animationProgress = 0;
        let scale = 1; // Initial scale

        // Handle Y position and scale based on scroll offset
        if (offset >= scrollStartFade && offset <= scrollEndFade) {
            // Calculate progress between scrollStartFade and scrollEndFade
            animationProgress = (offset - scrollStartFade) / (scrollEndFade - scrollStartFade);
            positionY = -0.075 + animationProgress * (-1 - -0.075); // Move Y position to -1
            scale = 1 - animationProgress * 0.4; // Scale down to 0.6
        } else if (offset > scrollEndFade) {
            // Fully transitioned
            animationProgress = 1;
            positionY = -1; // Final Y position
            scale = 0.6; // Final scale
        }

        // Move model to x: 1.5 by offset 0.1
        if (offset >= scrollWaveStart) {
            positionX = 1.5; // Move X position to 1.5
            positionZ = 2;
        }

        // Smoothly transition between animations
        if (actions.sitting && actions.standing) {
            actions.sitting.weight = 1 - animationProgress; // Fade out sitting animation
            actions.standing.weight = animationProgress; // Fade in standing animation
            actions.standing.play(); // Ensure standing animation is playing
        }

        // Switch to walking animation when Y position reaches -1
        if (positionY === -1 && actions.walking && actions.standing) {
            actions.standing.stop(); // Stop standing animation
            actions.walking.play(); // Start walking animation
            actions.walking.weight = 1; // Fully transition to walking animation
        }

        // Start waving animation at offset 0.1
        if (offset >= scrollWaveStart && actions.waving && actions.walking) {
            actions.walking.stop(); // Stop walking animation
            actions.waving.play(); // Start waving animation
            actions.waving.weight = 1; // Fully transition to waving animation
        }

        // Switch to pointing animation at offset 0.5
        if (offset >= scrollPointStart && actions.pointing && actions.waving) {
            actions.waving.stop(); // Stop waving animation
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

        if (offset < scrollPointStart && actions.waving && actions.pointing) {
            actions.pointing.stop(); // Stop pointing animation
            actions.waving.play(); // Resume waving animation
            actions.waving.weight = 1; // Fully transition to waving animation
        }

        if (offset < scrollWaveStart && actions.walking && actions.waving) {
            actions.waving.stop(); // Stop waving animation
            actions.walking.play(); // Resume walking animation
            actions.walking.weight = 1; // Fully transition to walking animation
        }

        if (offset < scrollEndFade && actions.standing && actions.walking) {
            actions.walking.stop(); // Stop walking animation
            actions.standing.play(); // Resume standing animation
            actions.standing.weight = 1; // Fully transition to standing animation
        }

        if (offset <= scrollStartFade && actions.sitting && actions.standing) {
            actions.standing.stop(); // Stop standing animation
            actions.sitting.play(); // Resume sitting animation
            actions.sitting.weight = 1; // Fully transition to sitting animation
        }

        // Apply position, scale, and animations to the model
        if (group.current) {
            group.current.position.y = positionY;
            group.current.position.x = positionX;
            group.current.position.z = positionZ;
            group.current.scale.set(scale, scale, scale);
        }
    });

    useEffect(() => {
        const action = actions[animationName];
        if (action) {
            action.reset().play();
            return () => {
                action.fadeOut(0.5);
            };
        }
    }, [animationName, actions]);

    return (
        <group {...restProps} ref={group} position={[0.5, -0.1, 8]} rotation={[-Math.PI / 2, 0, 0]}>
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
import {useEffect, useRef} from 'react';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import {GroupProps, useLoader} from '@react-three/fiber';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

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
    const { animationName = 'phone', ...restProps } = props;
    const { nodes, materials } = useGLTF('./models/developer.glb') as CustomGLTF;

    const { animations: phoneAnimation } = useFBX('./models/phone.fbx');
    const { animations: wavingAnimation } = useFBX('./models/waving.fbx');
    const { animations: sittingAnimation } = useFBX('./models/sitting2.fbx');
    phoneAnimation[0].name = 'phone';
    wavingAnimation[0].name = 'waving';
    sittingAnimation[0].name = 'sitting';

    const { actions } = useAnimations([phoneAnimation[0], wavingAnimation[0], sittingAnimation[0]], group);

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
        <group {...restProps} ref={group} position={[0.5, -0.1, 1]} rotation={[-Math.PI / 2, 0, 0]}>
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
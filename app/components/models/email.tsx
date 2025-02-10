import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import * as THREE from 'three'

interface EmailGLTF extends GLTF {
    nodes: {
        Object_2: THREE.Mesh
    }
    materials: {
        default: THREE.Material
    }
}

export default function Email() {
    const { nodes, materials } = useGLTF('./models/email.glb') as EmailGLTF

    return (
        <group dispose={null} position={[-3.45, -0.2, 0]} scale={0.003}>
            <mesh
                geometry={nodes.Object_2.geometry}
                material={materials.default}
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </group>
    )
}

useGLTF.preload('./models/email.glb')

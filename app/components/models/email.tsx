import { useGLTF } from '@react-three/drei'
import { Mesh } from 'three'

export default function Email() {
    const { nodes, materials } = useGLTF('./models/email.glb') as any
console.log(materials)
    return (
        <group dispose={null} position={[-3.45, -0.2, 0]} scale={0.003}>
            <mesh
                geometry={(nodes.Object_2 as Mesh).geometry}
                material={materials['default']}
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </group>
    )
}

useGLTF.preload('./models/email.glb')

import {Decal, useTexture} from "@react-three/drei";

export default function Technology() {
    const magentoTexture = useTexture('./magento.svg');

    return (<>
        <mesh castShadow>
            <sphereGeometry args={[1, 50, 50]}/>
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.2} toneMapped={false}/>
            <Decal
                position={[0, 0, 1]}
                rotation={[0, 0, 0]}
                scale={1.5}
            >
                <meshBasicMaterial
                    map={magentoTexture}
                    transparent={true}
                    polygonOffset
                    polygonOffsetFactor={-1}
                />
            </Decal>
        </mesh>
        </>
    );
}
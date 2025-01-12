"use client";
import {Decal, OrbitControls, useHelper, useTexture} from "@react-three/drei";
import {useControls} from "leva";
import {Perf} from "r3f-perf";
import * as THREE from "three";
import wobbleVertexShader from "../../shaders/wobble/vertex.glsl";
import wobbleFragmentShader from "../../shaders/wobble/fragment.glsl";
import {mergeVertices} from "three/addons/utils/BufferGeometryUtils.js";
import CustomShaderMaterial from "three-custom-shader-material";
import {useMemo, useRef} from "react";
import {DirectionalLight, DirectionalLightHelper} from "three";
import {useFrame} from "@react-three/fiber";

export default function Experience() {
    const {perfVisible} = useControls('performance', {
        perfVisible: false,
    });
    const magentoTexture = useTexture('./magento.svg');

    const icosahedronGeometry = useMemo(() => {
        const icosahedronGeometry = new THREE.IcosahedronGeometry(2.5, 50);
        const mergedIcosahedronGeometry = mergeVertices(icosahedronGeometry);
        mergedIcosahedronGeometry.computeTangents();
        return mergedIcosahedronGeometry;
    }, []);

    const options = useMemo(() => {
        return {
            positionFrequency: {value: 0.5, min: 0, max: 2, step: 0.01},
            timeFrequency: {value: 0.4, min: 0, max: 2, step: 0.01},
            strength: {value: 0.3, min: 0, max: 1, step: 0.01},
            warpPositionFrequency: {value: 0.38, min: 0, max: 2, step: 0.01},
            warpTimeFrequency: {value: 0.12, min: 0, max: 2, step: 0.01},
            warpStrength: {value: 1.7, min: 0, max: 5, step: 0.01},
            colorA: { value: '#0000ff' },
            colorB: { value: '#ff0000' },
        }
    }, []);

    const {positionFrequency, timeFrequency, strength, warpPositionFrequency, warpTimeFrequency, warpStrength, colorA, colorB} = useControls('sphere', options);

    const uniforms = useMemo(() => ({
        uTime: new THREE.Uniform(0),
        uPositionFrequency: new THREE.Uniform(positionFrequency),
        uTimeFrequency: new THREE.Uniform(timeFrequency),
        uStrength: new THREE.Uniform(strength),
        uWarpPositionFrequency: new THREE.Uniform(warpPositionFrequency),
        uWarpTimeFrequency: new THREE.Uniform(warpTimeFrequency),
        uWarpStrength: new THREE.Uniform(warpStrength),
        uColorA: new THREE.Uniform(new THREE.Color(colorA)),
        uColorB: new THREE.Uniform(new THREE.Color(colorB)),
    }), [positionFrequency, timeFrequency, strength, warpPositionFrequency, warpTimeFrequency, warpStrength, colorA, colorB]);

    useFrame((state) => {
        const elapsedTime = state.clock.getElapsedTime();
        uniforms.uTime.value = elapsedTime;
    });

    const lightRef = useRef<DirectionalLight>(null);
    useHelper(lightRef as React.MutableRefObject<DirectionalLight>, DirectionalLightHelper, 1, "red");

    return (
        <>
            {perfVisible && <Perf position="top-left"/>}
            {/*<OrbitControls makeDefault/>*/}

            <directionalLight
                ref={lightRef}
                color={'#ffffff'}
                position={[0, 0, 10]}
                intensity={3}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={15}
                shadow-normalBias={0.05}
            />
            <color args={["#bdedfc"]} attach="background"/>
            {/*<mesh geometry={icosahedronGeometry} castShadow receiveShadow>*/}
            {/*    <CustomShaderMaterial*/}
            {/*        baseMaterial={THREE.MeshPhysicalMaterial}*/}
            {/*        vertexShader={wobbleVertexShader}*/}
            {/*        fragmentShader={wobbleFragmentShader}*/}
            {/*        uniforms={uniforms}*/}
            {/*        wireframe={false}*/}
            {/*        metalness={0}*/}
            {/*        roughness={0.5}*/}
            {/*        color={"#ffffff"}*/}
            {/*        transmission={0}*/}
            {/*        ior={1.5}*/}
            {/*        thickness={1.5}*/}
            {/*        transparent={true}*/}
            {/*    />*/}
            {/*    <CustomShaderMaterial*/}
            {/*        baseMaterial={THREE.MeshDepthMaterial}*/}
            {/*        vertexShader={wobbleVertexShader}*/}
            {/*        uniforms={uniforms}*/}
            {/*        depthPacking={THREE.RGBADepthPacking}*/}
            {/*        attach="customDepthMaterial"*/}
            {/*    />*/}
            {/*</mesh>*/}
            <mesh>
                <sphereGeometry args={[1, 50, 50]}/>
                {/*<meshStandardMaterial color="white" polygonOffset polygonOffsetFactor={-1} />*/}
                {/*<Decal*/}
                {/*    map={magentoTexture}*/}
                {/*    position={[0, 0, 1.5]}*/}
                {/*    rotation={[0, 0, 0]}*/}
                {/*    scale={1.5}*/}
                {/*/>*/}

                <meshStandardMaterial color="white"/>
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

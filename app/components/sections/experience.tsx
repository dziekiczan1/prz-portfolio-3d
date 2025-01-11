"use client";
import {Environment, OrbitControls, useHelper} from "@react-three/drei";
import {useControls} from "leva";
import {Perf} from "r3f-perf";
import * as THREE from "three";
import wobbleVertexShader from "../../shaders/wobble/vertex.glsl";
import wobbleFragmentShader from "../../shaders/wobble/fragment.glsl";
import {mergeVertices} from "three/addons/utils/BufferGeometryUtils.js";
import CustomShaderMaterial from "three-custom-shader-material";
import {useEffect, useRef} from "react";
import {DirectionalLight, DirectionalLightHelper, Mesh} from "three";
import {useFrame} from "@react-three/fiber";

export default function Experience() {
    const {perfVisible} = useControls("debug", {
        perfVisible: false,
    });

    const uniforms = {
        uTime: new THREE.Uniform(0),
        uPositionFrequency: new THREE.Uniform(0.5),
        uTimeFrequency: new THREE.Uniform(0.4),
        uStrength: new THREE.Uniform(0.3),
        uWarpPositionFrequency: new THREE.Uniform(0.38),
        uWarpTimeFrequency: new THREE.Uniform(0.12),
        uWarpStrength: new THREE.Uniform(1.7),
        uColorA: new THREE.Uniform(new THREE.Color("#0000ff")),
        uColorB: new THREE.Uniform(new THREE.Color("#ff0000")),
    };

    const meshRef = useRef<Mesh>(null);

    useEffect(() => {
        const mesh = meshRef.current;
        if (mesh) {
            let geometry = mesh.geometry;
            geometry = mergeVertices(geometry);
            geometry.computeTangents();
        }
    }, []);

    useFrame((state) => {
        const elapsedTime = state.clock.getElapsedTime();
        uniforms.uTime.value = elapsedTime;
    });

    const lightRef = useRef<DirectionalLight>(null);
    useHelper(lightRef as React.MutableRefObject<DirectionalLight>, DirectionalLightHelper, 1, "red");

    return (
        <>
            {perfVisible && <Perf position="top-left"/>}
            <OrbitControls makeDefault/>

            <directionalLight
                ref={lightRef}
                color={'#ffffff'}
                position={[0.25, 2, -2.25]}
                intensity={3}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={15}
                shadow-normalBias={0.05}
            />
            <Environment
                background
                files="./urban_alley_01_1k.hdr"
            >
            </Environment>

            <color args={["#bdedfc"]} attach="background"/>
            <mesh ref={meshRef} castShadow receiveShadow>
                <icosahedronGeometry args={[2.5, 50]}/>
                <CustomShaderMaterial
                    baseMaterial={THREE.MeshPhysicalMaterial}
                    vertexShader={wobbleVertexShader}
                    fragmentShader={wobbleFragmentShader}
                    uniforms={uniforms}
                    wireframe={false}
                    metalness={0}
                    roughness={0.5}
                    color={"#ffffff"}
                    transmission={0}
                    ior={1.5}
                    thickness={1.5}
                    transparent={true}
                />
                <CustomShaderMaterial
                    baseMaterial={THREE.MeshDepthMaterial}
                    vertexShader={wobbleVertexShader}
                    uniforms={uniforms}
                    depthPacking={THREE.RGBADepthPacking}
                    attach="customDepthMaterial"
                />
            </mesh>

            <mesh
                rotation={[0, Math.PI, 0]}
                position={[0, -5, 5]}
                receiveShadow
            >
                <planeGeometry args={[15, 15, 15]}/>
                <meshStandardMaterial side={THREE.DoubleSide}/>
            </mesh>
        </>
    );
}

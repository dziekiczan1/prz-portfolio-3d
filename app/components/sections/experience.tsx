"use client";
import {useHelper} from "@react-three/drei";
import {useControls} from "leva";
import {Perf} from "r3f-perf";
import {useRef} from "react";
import {DirectionalLight, DirectionalLightHelper} from "three";
import Wobble from "@/app/components/models/wobble";
import Technology from "@/app/components/models/technology";

export default function Experience({currentSection}: {currentSection: string | null}) {
    const {perfVisible} = useControls('performance', {
        perfVisible: false,
    });

    const lightRef = useRef<DirectionalLight>(null);
    // useHelper(lightRef as React.MutableRefObject<DirectionalLight>, DirectionalLightHelper, 1, "red");

    return (
        <>
            {perfVisible && <Perf position="top-left"/>}

            <directionalLight
                ref={lightRef}
                color={'#ffffff'}
                position={[-1, 2, 2]}
                intensity={3}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={15}
                shadow-normalBias={0.05}
            />
            <ambientLight intensity={0.5}/>
            <color args={["#0F172A"]} attach="background"/>
            <Wobble currentSection={currentSection}/>
            <Technology/>
        </>
    );
}

"use client";
import {useProgress} from "@react-three/drei";


export default function Loader() {
    const {progress} = useProgress();
    return (
        <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center z-50">
            <div
                className="w-20 h-20 border-2 border-opacity-20 border-white border-t-white rounded-full animate-spin"/>
            <div className="mt-4 text-white">{Math.round(progress)}%</div>
        </div>
    );
}
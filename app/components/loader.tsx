"use client";
import {useProgress} from "@react-three/drei";


export default function Loader() {
    const {progress} = useProgress();
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div
                className="w-20 h-20 border-2 border-opacity-20 border-blue-500 border-t-blue-500 rounded-full animate-spin"/>
            <div className="mt-4 text-white">{Math.round(progress)}%</div>
        </div>
    );
}
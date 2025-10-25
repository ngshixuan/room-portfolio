import Room from "./components/experience/Room";
import Lights from "./components/experience/Lights";
import GradientBackground from "./components/experience/GradientBackground";
import ParticleField from "./components/experience/ParticleField";
import HeightMap from "./components/experience/HeightMap";
import { useEffect, useMemo } from "react";
import { LinearFilter, RGBAFormat, WebGLRenderTarget } from "three";
import { useThree } from "@react-three/fiber";

export default function Experience({ onStarted, started }) {
    const { size } = useThree();

    const surfaceMapTarget = useMemo(() => {
        return new WebGLRenderTarget(512, 512, {
            minFilter: LinearFilter,
            magFilter: LinearFilter,
            format: RGBAFormat,
            stencilBuffer: false,
        });
    }, []);

    useEffect(() => {
        if (onStarted) {
            onStarted();
        }
    }, [onStarted]);

    useEffect(() => {
        surfaceMapTarget.setSize(size.width, size.height);
    }, [size, surfaceMapTarget]);

    return (
        <>
            <GradientBackground />
            <HeightMap renderTarget={surfaceMapTarget} />

            <ParticleField collisionMap={surfaceMapTarget.texture} />
            <Room />

            <Lights />
        </>
    );
}

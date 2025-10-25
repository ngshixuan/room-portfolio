import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import vertexShader from "../../shader/background/vertex.glsl";
import fragmentShader from "../../shader/background/fragment.glsl";
import * as THREE from "three";
import { Plane } from "@react-three/drei";

export default function GradientBackground() {
    const meshRef = useRef();
    const { viewport, size } = useThree();
    const uniforms = useMemo(
        () => ({
            uResolution: { value: new THREE.Vector2() },
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color(0.96, 0.93, 0.89) }, // Warm ivory
            uColor2: { value: new THREE.Color(0.91, 0.83, 0.76) }, // Light taupe
            uColor3: { value: new THREE.Color(0.86, 0.76, 0.65) }, // Soft clay
        }),
        []
    );

    useEffect(() => {
        uniforms.uResolution.value.x = size.width * viewport.dpr;
        uniforms.uResolution.value.y = size.height * viewport.dpr;
    }, [size, viewport.dpr, uniforms.uResolution]);

    useFrame((state) => {
        if (meshRef.current) {
            uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <Plane
            args={[viewport.width, viewport.height, 1, 1]}
            position={[0, 0, -10]}
        >
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
            />
        </Plane>
    );
}

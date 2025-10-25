import { useMemo, useRef } from "react";
import {
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    Color,
    Vector2,
} from "three";
import particleVertexShader from "./shader/particles/vertex.glsl";
import particleFragmentShader from "./shader/particles/fragment.glsl";
import { useFrame } from "@react-three/fiber";

export default function ParticleField({ count = 5000, collisionMap }) {
    const materialRef = useRef();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const random = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            random[i] = Math.random();
        }

        const geometry = new BufferGeometry();
        geometry.setAttribute("position", new BufferAttribute(positions, 3));
        geometry.setAttribute("aRandom", new BufferAttribute(random, 1));
        return geometry;
    }, [count]);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new Vector2(0.0) },
            uCollisionMap: { value: collisionMap },
            uColor: { value: new Color(0.8, 0.8, 1.0) },
        }),
        [collisionMap]
    );

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <points>
            <bufferGeometry attach="geometry" {...particles} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={particleVertexShader}
                fragmentShader={particleFragmentShader}
                uniforms={uniforms}
                depthWrite={false}
                blending={AdditiveBlending}
                transparent={true}
            />
        </points>
    );
}

import { MeshReflectorMaterial, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useMemo } from "react";
import { CanvasTexture, RepeatWrapping } from "three";

export default function Room({}) {
    const room = useGLTF("./room.glb");

    const groupRef = useRef();
    const targetRotation = useRef(0);
    const currentRotation = useRef(0);

    const alphaMap = useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const context = canvas.getContext("2d");

        const gradient = context.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2
        );

        gradient.addColorStop(0, "white"); // Opaque center
        gradient.addColorStop(1, "black"); // Transparent edges

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        const texture = new CanvasTexture(canvas);
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        return texture;
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            let x = (e.clientX / window.innerWidth) * 2 - 1;
            targetRotation.current = x * 0.05;
        };

        if (groupRef.current) {
            gsap.registerPlugin(ScrollTrigger);
            gsap.to(groupRef.current.position, {
                x: () => window.innerWidth * 0.0018,
                duration: 8,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: ".animation-section",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 3,
                    invalidateOnRefresh: true,
                },
            });
        }

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;

        currentRotation.current +=
            (targetRotation.current - currentRotation.current) * 0.1;
        groupRef.current.rotation.y = currentRotation.current;
    });

    return (
        <>
            <group ref={groupRef}>
                <primitive
                    object={room.scene}
                    scale={0.25}
                    position={[0.6, -1, 0]}
                />
            </group>
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1, 0]}
                receiveShadow
            >
                <planeGeometry args={[20, 20]} />
                <meshBasicMaterial
                    color="#404040" // A neutral grey color
                    alphaMap={alphaMap}
                    transparent={true}
                    depthWrite={false}
                />
            </mesh>
        </>
    );
}

import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";

export default function Lights() {
    const lightRef = useRef();
    //useHelper(lightRef, DirectionalLightHelper, 1, "hotpink");

    return (
        <>
            <ambientLight intensity={1.5} />
            <directionalLight
                ref={lightRef}
                position={[4, 4, -1]}
                intensity={4.5}
            />
        </>
    );
}

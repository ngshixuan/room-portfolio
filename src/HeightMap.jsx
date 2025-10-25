import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { OrthographicCamera, ShaderMaterial, Vector3 } from "three";
import heightVertex from "./shader/heightMap/vertex.glsl";
import heightFragment from "./shader/heightMap/fragment.glsl";

const heightMapMaterial = new ShaderMaterial({
    vertexShader: heightVertex,
    fragmentShader: heightFragment,
});

export default function HeightMap({ renderTarget }) {
    const { scene, gl, size } = useThree();

    const camera = useMemo(() => {
        const bounds = { width: 10, height: 10 };
        const camera = new OrthographicCamera(
            -bounds.width / 2,
            bounds.width / 2,
            bounds.height / 2,
            -bounds.height / 2,
            0.1,
            100
        );

        camera.position.set(0, 10, 0);
        camera.lookAt(new Vector3(0, 0, 0));

        return camera;
    }, []);

    useEffect(() => {
        const aspect = size.width / size.height;
        const bounds = { width: 10, height: 10 };
        camera.left = (-bounds.width / 2) * aspect;
        camera.right = (bounds.width / 2) * aspect;
        camera.top = bounds.height / 2;
        camera.bottom = -bounds.height / 2;
        camera.updateProjectionMatrix();
    }, [size, camera]);

    useFrame(() => {
        scene.overrideMaterial = heightMapMaterial;

        gl.setRenderTarget(renderTarget);
        gl.render(scene, camera);

        gl.setRenderTarget(null);
        scene.overrideMaterial = null;
    });

    return null;
}

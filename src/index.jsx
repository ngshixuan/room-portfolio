import "./style.css";
import { Canvas } from "@react-three/fiber";
import ReactDOM from "react-dom/client";
import Content from "./components/ui/Content";
import SmoothScroll from "./components/ui/SmoothScroll";
import { Suspense, useEffect, useState } from "react";
import Loader from "./components/ui/Loader";
import Scene from "./components/experience/Scene";
import { useProgress } from "@react-three/drei";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
    const { active } = useProgress();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // When loading is finished, update the state
        if (!active) {
            setIsLoaded(true);
        }
    }, [active]);

    return (
        <>
            <SmoothScroll />
            <Canvas
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [2.5, 2.5, 8],
                }}
                className="canvas-background"
            >
                <Suspense fallback={null}>
                    <Scene visible={isLoaded} />
                    <Loader />
                </Suspense>
            </Canvas>
            <div
                style={{
                    opacity: isLoaded ? 1 : 0,
                    transition: "opacity 2s ease-in-out 0.5s",
                }}
            >
                <Content />
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
    <Suspense fallback={null}>
        <App />
        <Analytics />
        <SpeedInsights />
    </Suspense>
);

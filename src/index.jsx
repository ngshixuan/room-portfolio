import "./style.css";
import Experience from "./Experience";
import { Canvas } from "@react-three/fiber";
import ReactDOM from "react-dom/client";
import Content from "./components/ui/Content";
import SmoothScroll from "./SmoothScroll";
import { Suspense, useState } from "react";
import Loader from "./components/ui/Loader";

function App() {
    const [started, setStarted] = useState(false);

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
                <Suspense fallback={<Loader />}>
                    <Experience
                        onStarted={() => setStarted(true)}
                        started={started}
                    />
                </Suspense>
            </Canvas>
            <div
                style={{
                    opacity: started ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out 0.5s",
                }}
            >
                <Content />
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(<App />);

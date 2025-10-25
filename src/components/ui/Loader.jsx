import { Html, useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export default function Loader() {
    const { progress, active } = useProgress();
    const [displayProgress, setDisplayProgress] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        let animationFrameId;
        const animate = () => {
            setDisplayProgress((prev) => {
                if (prev >= progress) return progress;
                const diff = progress - prev;
                const step = diff * 0.1;
                return prev + step;
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [progress]);

    useEffect(() => {
        // When loading is complete (active is false)
        if (!active) {
            // Wait a moment for the 100% to be visible
            setTimeout(() => {
                setShow(false);
            }, 500);
        }
    }, [active]);

    return (
        <Html fullscreen>
            <div
                className="progress"
                style={{
                    opacity: show ? 1 : 0,
                    transition: "opacity 1s ease",
                }}
            >
                <div className="progress-container">
                    <h2 className="loader-title">Loading Experience</h2>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${displayProgress}%` }}
                        />
                    </div>
                    <span className="progress-text">
                        {Math.round(displayProgress)}%
                    </span>
                </div>
            </div>
        </Html>
    );
}

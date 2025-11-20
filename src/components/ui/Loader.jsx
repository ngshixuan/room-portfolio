import { Html, useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export default function Loader({ onFinished }) {
    const { progress, active } = useProgress();
    const [displayProgress, setDisplayProgress] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (active) {
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
        }
    }, [progress, active]);

    useEffect(() => {
        // 2. Only trigger completion if active is false AND we have actually loaded something (progress > 0)
        // or purely rely on !active after the initial mount.
        if (!active && displayProgress === 100) {
            // Wait a moment for the 100% to be visible
            const timeout = setTimeout(() => {
                setShow(false);

                // 3. Tell the App component we are truly done
                if (onFinished) onFinished();
            }, 800);

            return () => clearTimeout(timeout);
        }
    }, [active, displayProgress, onFinished]);

    useEffect(() => {
        if (!active) {
            setDisplayProgress(100);
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

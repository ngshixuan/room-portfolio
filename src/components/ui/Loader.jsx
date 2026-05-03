import { Html, useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export default function Loader({ onFinished }) {
    const { progress, active } = useProgress();
    const [displayProgress, setDisplayProgress] = useState(0);
    const [show, setShow] = useState(true);
    const activeRef = useRef(active);
    const progressRef = useRef(progress);

    useEffect(() => { activeRef.current = active; }, [active]);
    useEffect(() => { progressRef.current = progress; }, [progress]);

    // Single animation loop — always runs, targets real progress when loading,
    // targets 100 when done (handles cached/instant loads too).
    useEffect(() => {
        let id;
        const tick = () => {
            const target = activeRef.current ? progressRef.current : 100;
            setDisplayProgress((prev) => {
                if (Math.abs(target - prev) < 0.5) return target;
                return prev + (target - prev) * 0.08;
            });
            id = requestAnimationFrame(tick);
        };
        id = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(id);
    }, []);

    useEffect(() => {
        if (displayProgress >= 99.5) {
            const t = setTimeout(() => {
                setShow(false);
                if (onFinished) onFinished();
            }, 800);
            return () => clearTimeout(t);
        }
    }, [displayProgress, onFinished]);

    return (
        <Html fullscreen>
            <div
                className="progress"
                style={{
                    opacity: show ? 1 : 0,
                    transition: "opacity 1s ease",
                }}
            >
                <span className="loader-watermark">NSX</span>
                <div className="progress-container">
                    <p className="loader-label">Loading Experience</p>
                    <div className="loader-percentage">
                        {Math.round(displayProgress)}
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${displayProgress}%` }}
                        />
                    </div>
                </div>
            </div>
        </Html>
    );
}

import { Html, useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function Loader() {
    const { progress } = useProgress();
    const [isComplete, setIsComplete] = useState();
    const [displayProgress, setDisplayProgress] = useState(0);

    // Smoothly animate the progress bar from 0 to the actual progress
    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayProgress((prev) => {
                const next = prev + Math.random() * 15;
                return next > progress ? progress : next;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [progress]);

    useEffect(() => {
        if (progress === 100) {
            setDisplayProgress(100);
            setTimeout(() => {
                setIsComplete(true);
            }, 500);
        }
    }, [progress]);

    return (
        <Html fullscreen>
            <div
                className={`progress ${isComplete ? "progress-complete" : ""}`}
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

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import Experience from "../../Experience";

export default function Scene({ onStarted, started }) {
    const { active } = useProgress();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!active) {
            setVisible(true);
        }
    }, [active]);

    return visible ? (
        <Experience onStarted={onStarted} started={started} />
    ) : null;
}

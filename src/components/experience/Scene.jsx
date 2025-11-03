import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import Experience from "../../Experience";

export default function Scene({ visible }) {
    return visible ? <Experience /> : null;
}

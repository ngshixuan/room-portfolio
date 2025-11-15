import Experience from "../../Experience";

export default function Scene({ visible }) {
    return visible ? <Experience /> : null;
}

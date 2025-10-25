export default function Content() {
    return (
        <>
            <div className="content">
                <div className="content-overlay">
                    <section className="description">
                        <div className="intro">
                            <h1>Ng Shi Xuan</h1>
                            <p>Web Developer</p>
                        </div>
                        <div className="intro-second">
                            <h1>MY</h1>
                            <h1>PORTFOLIO</h1>
                        </div>
                        <div className="arrow-svg-wrapper">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                width="24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z"
                                ></path>
                            </svg>
                        </div>
                    </section>
                    <section className="animation-section"></section>
                </div>
                <div className="about">
                    <div className="about-title">
                        <h1>About Me</h1>
                    </div>
                    <div className="about-text">
                        <p>
                            Hi there, I am a{" "}
                            <strong>self-taught front-end developer</strong>{" "}
                            passionate about building impactful web experiences
                        </p>
                        <p>
                            My journey started with curiosity — learning tools
                            like{" "}
                            <strong>
                                ReactJS, React Three Fiber, ThreeJS, Blender
                            </strong>{" "}
                            on my own, experimenting with APIs, and turning
                            small ideas into complete projects.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

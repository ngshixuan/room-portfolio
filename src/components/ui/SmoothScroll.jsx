import Lenis from "lenis";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({ duration: 1.2 });

        // 1. Sync GSAP's ticker with Lenis's animation frame loop for optimal performance
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // 2. Connect Lenis's 'scroll' event to ScrollTrigger's update method
        lenis.on("scroll", ScrollTrigger.update);

        // 3. Set up the ScrollTrigger scrollerProxy to use Lenis for scroll calculations
        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
                if (arguments.length) {
                    lenis.scrollTo(value, { immediate: true });
                }
                return lenis.scroll;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
        });

        // Refresh ScrollTrigger to ensure it uses the new proxy settings
        ScrollTrigger.refresh();

        // Cleanup function
        return () => {
            lenis.destroy();
            // Remove the proxy and listeners to prevent memory leaks
            ScrollTrigger.scrollerProxy(document.body, {});
        };
    }, []);

    return null;
}

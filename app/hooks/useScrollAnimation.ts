import { useState, useEffect } from "react";

export function useScrollAnimation() {
    const [scrollOffset, setScrollOffset] = useState(0);

    // Track window.scrollY and calculate normalized offset
    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const offset = window.scrollY / scrollHeight;
            setScrollOffset(offset);
        };

        // Listen for scroll events
        window.addEventListener("scroll", handleScroll);

        // Manually trigger on initial load
        handleScroll();

        // Cleanup
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle hash links
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash) {
                const section = document.querySelector(hash) as HTMLElement | null;
                if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                }
            }
        };

        // Listen for hash changes
        window.addEventListener("hashchange", handleHashChange);

        // Manually trigger on initial load
        handleHashChange();

        // Cleanup
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    return scrollOffset;
}
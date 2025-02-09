import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import {BlurIn} from "@/components/ui/blur-in";

import {aboutSection} from "@/constants/sections";

export default function About() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Animation values based on scroll progress
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section className="h-screen flex items-center justify-center" id="about" ref={ref}>
            <motion.div
                className="flex flex-col gap-6 max-w-5xl px-8"
                style={{opacity, y}}
            >
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.2}}
                    viewport={{once: true}}
                >
                    <BlurIn className="section-heading">
                        {aboutSection.heading}
                    </BlurIn>
                </motion.div>

                <motion.div
                    className="space-y-6"
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{staggerChildren: 0.2, delayChildren: 0.3}}
                    viewport={{once: true}}
                >
                    {aboutSection.paragraphs.map((paragraph, index) => (
                        <motion.p
                            key={index}
                            className="text-lg font-normal text-gray-300 leading-relaxed"
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: index * 0.2}}
                        >
                            {paragraph}
                        </motion.p>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
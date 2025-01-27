import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {BlurIn} from "@/components/ui/blur-in";

export default function About() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"], // Trigger when section enters and exits viewport
    });

    // Animation values based on scroll progress
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]); // Fade in and out
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]); // Move up as user scrolls

    return (
        <section className="h-screen flex items-center justify-center" id="about" ref={ref}>
            <motion.div
                className="flex flex-col gap-6 max-w-5xl px-8"
                style={{ opacity, y }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <BlurIn className="text-fuchsia-500 text-4xl font-semibold text-center mb-8">Crafting Digital Experiences with Passion</BlurIn>
                </motion.div>

                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
                    viewport={{ once: true }}
                >
                    <motion.p
                        className="text-lg font-normal text-gray-300 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Hi, I’m Piotr Rzadkowolski, a frontend developer with 3 years of commercial experience, passionate
                        about creating engaging and efficient web solutions. My journey into coding began as a self-taught
                        enthusiast, and over time, I’ve honed my skills by learning from industry experts and immersing
                        myself in the ever-evolving world of web development. Currently, I’m mastering Next.js and Angular,
                        always striving to push the boundaries of what I can create.
                    </motion.p>

                    <motion.p
                        className="text-lg font-normal text-gray-300 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        I’m deeply committed to both personal and professional growth, dedicating my free time to exploring
                        new technologies and refining my craft. Known for my discipline, ability to work under pressure, and
                        dedication to continuous improvement, I thrive in dynamic environments. Whether working
                        independently or as part of a team, I bring responsibility, innovation, and a collaborative spirit
                        to every project.
                    </motion.p>

                    <motion.p
                        className="text-lg font-normal text-gray-300 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Beyond coding, I’m an avid diver, cyclist, and traveler. I love meeting new people, exploring new
                        places, and drawing inspiration from the world around me. My high personal standards, attention to
                        detail, and creative approach ensure that I not only meet but exceed expectations in both my
                        professional and personal pursuits.
                    </motion.p>
                </motion.div>
            </motion.div>
        </section>
    );
}
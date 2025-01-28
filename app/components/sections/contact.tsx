"use client";
import {HoverBorderGradient} from "@/components/ui/button";
import dynamic from "next/dynamic";
import {BlurIn} from "@/components/ui/blur-in";
import {motion} from "framer-motion";

const Input = dynamic(() => import("@/components/ui/input"), {ssr: false});

export default function Contact() {
    return (
        <section className="h-screen flex items-center justify-center" id="contact">
            <form className="relative p-8 max-w-5xl w-full mx-auto rounded-xl border border-[rgba(255,255,255,0.4)]
                          bg-gradient-to-b from-[rgba(51,65,85,0.6)] to-[rgba(15,23,42,0.6)]
                          shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm">
                <BlurIn className="text-fuchsia-500 text-4xl font-semibold text-center mb-8">
                    Let’s Connect
                </BlurIn>
                <motion.p initial={{opacity: 0, y: 20}}
                          whileInView={{opacity: 1, y: 0}}
                          transition={{duration: 0.6}}
                          className="text-lg font-normal text-gray-300 leading-relaxed mb-8">
                    Whether you have a project in mind, want to collaborate, or just want to say hello, I’d love to hear
                    from you.
                    Feel free to reach out, and I’ll get back to you as soon as possible. Let’s create something amazing
                    together!
                </motion.p>
                <fieldset className="space-y-8">
                    <Input
                        label="Your Name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full"
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="john.doe@example.com"
                        className="w-full"
                    />
                    <Input
                        label="Subject"
                        type="text"
                        placeholder="Let us know how we can help"
                        className="w-full"
                    />
                    <Input
                        label="Your Message"
                        textarea
                        rows={4}
                    />
                </fieldset>
                <HoverBorderGradient type="submit" containerClassName="w-full mt-8">
                    Send Message
                </HoverBorderGradient>
            </form>
        </section>
    );
}